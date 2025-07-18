"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { embed } from "ai";
import crypto from "crypto";
import { NextResponse } from "next/server";

const openai = createOpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

// Simple LRU Cache implementation
class LRUCache<T> {
  private cache = new Map<string, { value: T; timestamp: number }>();
  private maxSize: number;
  private ttl: number; // Time to live in milliseconds

  constructor(maxSize = 1000, ttlMinutes = 60) {
    this.maxSize = maxSize;
    this.ttl = ttlMinutes * 60 * 1000;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.ttl;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item || this.isExpired(item.timestamp)) {
      if (item) this.cache.delete(key);
      return null;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }

  set(key: string, value: T): void {
    // Remove expired entries
    for (const [k, v] of this.cache.entries()) {
      if (this.isExpired(v.timestamp)) {
        this.cache.delete(k);
      }
    }

    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, { value, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
const embeddingCache = new LRUCache<number[]>(1000, 60); // Cache 1000 embeddings for 60 minutes

function generateCacheKey(text: string): string {
  return crypto
    .createHash("sha256")
    .update(text.trim().toLowerCase())
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Generate cache key
    const cacheKey = generateCacheKey(text);

    // Check cache first
    const cachedEmbedding = embeddingCache.get(cacheKey);
    if (cachedEmbedding) {
      return NextResponse.json({
        embedding: cachedEmbedding,
        cached: true,
      });
    }

    // Generate new embedding
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: text,
    });

    // Store in cache
    embeddingCache.set(cacheKey, embedding);

    return NextResponse.json({
      embedding,
      cached: false,
    });
  } catch (error) {
    console.error("Embedding error:", error);
    return NextResponse.json(
      { error: "Failed to generate embedding" },
      { status: 500 },
    );
  }
}

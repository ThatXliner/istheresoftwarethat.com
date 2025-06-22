import {
  Briefcase,
  Code,
  Figma,
  Film,
  GraduationCap,
  MessageSquare,
  Palette,
  Shield,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import * as z from "zod/v4";
export const compatibilitySchema = z.object({
  windows: z.boolean(),
  macos: z.boolean(),
  linux: z.boolean(),
});

export const linksSchema = z.object({
  website: z.url(),
  github: z.url().optional(),
});

export const installationInstructionsSchema = z.object({
  windows: z.string(),
  macos: z.string(),
  linux: z.string(),
});

export const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const reviewSchema = z.object({
  username: z.string(),
  date: z.string(),
  comment: z.string(),
  helpful: z.number(),
  isUpvote: z.boolean(),
});

export const categorySchema = z.enum([
  "Development",
  "Design",
  "Communication",
  "Productivity",
  "Media",
  "Security",
  "Utilities",
  "Education",
]);

export const softwareSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  upvotes: z.number(),
  icon: z.any(), // LucideIcon type
  category: categorySchema,
  added_date: z.string().transform((date) => new Date(date)),
  compatibility: compatibilitySchema,
  links: linksSchema.optional(),
  installationInstructions: installationInstructionsSchema.optional(),
  features: z.array(featureSchema).optional(),
  reviews: z.array(reviewSchema),
});

export type Category = { name: string; icon: LucideIcon; color: string };
export type Compatibility = z.infer<typeof compatibilitySchema>;
export type Software = z.infer<typeof softwareSchema>;

export const categories: Category[] = [
  { name: "Development", icon: Code, color: "blue" },
  { name: "Design", icon: Palette, color: "purple" },
  { name: "Communication", icon: MessageSquare, color: "green" },
  { name: "Productivity", icon: Briefcase, color: "orange" },
  { name: "Media", icon: Film, color: "red" },
  { name: "Security", icon: Shield, color: "slate" },
  { name: "Utilities", icon: Wrench, color: "amber" },
  { name: "Education", icon: GraduationCap, color: "emerald" },
];

export const ALL_PLATFORMS: Compatibility = {
  linux: true,
  macos: true,
  windows: true,
};
// Mock featured software data
export const featuredSoftware: Software[] = [
  {
    id: 1,
    name: "VS Code",
    description:
      "Powerful, lightweight code editor with extensive extension support",
    category: "Development",
    upvotes: 1250,
    icon: Code,
    added_date: new Date("2025-01-01"),
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
  {
    id: 2,
    name: "GIMP",
    description: "Professional image editing software with advanced features",
    category: "Design",
    upvotes: 980,
    icon: Code,
    added_date: new Date("2025-01-01"),
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
  {
    id: 3,
    name: "Blender",
    description: "3D creation suite for modeling, animation, and rendering",
    category: "Media",
    upvotes: 1420,
    icon: Code,
    added_date: new Date("2025-01-01"),
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
  {
    id: 4,
    name: "LibreOffice",
    description:
      "Complete office suite with word processing, spreadsheets, and presentations",
    category: "Productivity",
    upvotes: 890,
    icon: Code,
    added_date: new Date("2025-01-01"),
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
];
export async function getRecentAdditions(amount = 5) {}
// Mock recent additions data
export const recentAdditions: Software[] = [
  {
    id: 5,
    name: "Obsidian",
    description:
      "Knowledge management app with powerful linking and note-taking features",
    category: "Productivity",
    added_date: new Date("2025-01-02"),
    icon: Code,
    upvotes: 69,
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
  {
    id: 6,
    name: "Figma",
    description:
      "Collaborative interface design tool with real-time collaboration",
    category: "Design",
    added_date: new Date("2025-01-01"),
    icon: Figma,
    upvotes: 69,
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
  {
    id: 7,
    name: "Discord",
    description: "Voice, video and text communication platform for communities",
    category: "Communication",
    added_date: new Date("2024-12-30"),
    icon: MessageSquare,
    upvotes: 69,
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
  {
    id: 8,
    name: "OBS Studio",
    description:
      "Free and open source software for video recording and live streaming",
    category: "Media",
    added_date: new Date("2024-12-28"),
    icon: Video,
    upvotes: 69,
    compatibility: ALL_PLATFORMS,
    reviews: [],
  },
];

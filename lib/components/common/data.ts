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
import {
  DynamicIcon,
  dynamicIconImports,
  IconName,
} from "lucide-react/dynamic";
import Image from "next/image";
import { createElement } from "react";
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
// XXX: Should use discriminated unions
export const reviewSchema = z.preprocess(
  (data: { is_upvote: null | boolean }) => ({
    ...data,
    type: data.is_upvote !== null ? "upvote" : "review",
  }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("upvote"),
      is_upvote: z.boolean(),

      helpful_count: z.null(),
      stars: z.null(),
      comment: z.null(),

      username: z.string(),
      date: z.string(),
    }),
    z.object({
      type: z.literal("review"),
      is_upvote: z.null(),

      helpful_count: z.number(),
      stars: z.number().min(1).max(5),
      comment: z.string(),

      username: z.string(),
      date: z.string(),
    }),
  ]),
);

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
  icon: z.enum(Object.keys(dynamicIconImports) as IconName[]).nullable(),
  category: categorySchema,
  // for some reason iso.datetime() doesn't work
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

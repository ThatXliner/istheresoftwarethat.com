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
// XXX: Should use discriminated unions
export const reviewSchema = z.union([
  z.object({
    is_upvote: z.boolean(),

    helpful_count: z.null(),
    stars: z.null(),
    comment: z.null(),

    username: z.string(),
    date: z.string(),
  }),
  z.object({
    is_upvote: z.null(),

    helpful_count: z.number(),
    stars: z.number().min(1).max(5),
    comment: z.string(),

    username: z.string(),
    date: z.string(),
  }),
]);

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
const reviewsSchema = reviewSchema.array();
export type Reviews = z.infer<typeof reviewsSchema>;

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

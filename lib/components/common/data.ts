import {
  Briefcase,
  Code,
  Film,
  GraduationCap,
  type LucideIcon,
  MessageSquare,
  Palette,
  Shield,
  Wrench,
} from "lucide-react";
import { dynamicIconImports, type IconName } from "lucide-react/dynamic";
import * as z from "zod/v4";

// Schema for software compatibility (windows, macos, linux)
const compatibilitySchema = z.object({
  windows: z.boolean(),
  macos: z.boolean(),
  linux: z.boolean(),
  // Assuming 'web' and 'mobile' might also be present based on seed data, make them optional
  web: z.boolean().optional(),
  mobile: z.boolean().optional(),
});

// Schema for external links related to the software
const linksSchema = z.object({
  website: z.url(),
  github: z.url().optional(),
  download: z.url().optional(), // Added as per seed data
  documentation: z.url().optional(), // Added as per seed data
});

// Schema for installation instructions across different OS
const installationInstructionsSchema = z.object({
  windows: z.string(),
  macos: z.string(),
  linux: z.string(),
});

// Schema for individual software features
const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string().nullable(), // Added category as it's part of the migrated features
});

// Schema for screenshots (array of URLs)
const screenshotsSchema = z.array(z.url());

// My reviews table in the database lets stars, comment, and is_upvote be nullable
// with no database rules forcing them to be exclusive.
// That means the DB won’t stop a review from having both an upvote and
// stars + comments at the same time. This is the logic that makes sure
// each review is either a star rating + comment or an upvote, never both.
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

// Enum for software categories
const categorySchema = z.enum([
  "Development",
  "Design",
  "Communication",
  "Productivity",
  "Media",
  "Security",
  "Utilities",
  "Education",
]);

// Schema for the consolidated 'other_details' JSONB column
const otherDetailsSchema = z.object({
  long_description: z.string(),
  short_description: z.string(),
  icon: z.enum(Object.keys(dynamicIconImports) as IconName[]).nullable(),
  links: linksSchema.optional(),
  screenshots: screenshotsSchema.optional(), // Now an array of URLs within other_details
  features: z.array(featureSchema).optional(), // Now an array of feature objects within other_details
  installation_instructions: installationInstructionsSchema.optional(), // Now an object within other_details
});
export const statsSchema = z.object({
  downloads: z.number(),
  github_stars: z.number().nullable(),
  contributors: z.number().nullable(),
  issues: z.number().nullable(),
});
// Main software schema, reflecting the consolidated data
export const softwareSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: categorySchema,
  added_date: z.string().transform((date) => new Date(date)),
  last_updated: z
    .string()
    .transform((date) => new Date(date))
    .nullable(), // last_updated is nullable in SQL
  compatibility: compatibilitySchema,
  tags: z.array(z.string()).nullable(), // tags is an ARRAY in SQL
  version: z.string().nullable(),
  license: z.string().nullable(),
  size: z.number().nullable(), // size is bigint in SQL
  is_active: z.boolean().default(true),

  // All previously separate fields are now nested under other_details
  other_details: otherDetailsSchema,

  stats: statsSchema,
  reviews: z.array(reviewSchema),
});

export type Category = { name: string; icon: LucideIcon; color: string };
export type Compatibility = z.infer<typeof compatibilitySchema>;
export const catalogSummarySchema = softwareSchema
  .pick({
    category: true,
    id: true,
    name: true,
    compatibility: true,
    version: true,
    license: true,
    tags: true,
    added_date: true,
  })
  .extend({
    description: z.string(),
    upvotes: z.number(),
    icon: z.string().nullable(),
  })
  .array();
export type Software = z.infer<typeof softwareSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type CatalogSummary = z.infer<typeof catalogSummarySchema>;

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

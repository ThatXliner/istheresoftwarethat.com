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
interface Category {
  name: string;
  icon: LucideIcon;
  color: string;
}
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

// Um there has to be a smarter, more dynamic way to do this
export type Categories =
  | "Development"
  | "Design"
  | "Communication"
  | "Productivity"
  | "Media"
  | "Security"
  | "Utilities"
  | "Education";
export interface Software {
  id: number;
  name: string;
  description: string;
  upvotes: number;
  icon: LucideIcon;
  category: Categories;
  addedDate: Date;
  // TODO: License, platform, readme link, download method, etc
}
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
    addedDate: new Date("2025-01-01"),
  },
  {
    id: 2,
    name: "GIMP",
    description: "Professional image editing software with advanced features",
    category: "Design",
    upvotes: 980,
    icon: Code,
    addedDate: new Date("2025-01-01"),
  },
  {
    id: 3,
    name: "Blender",
    description: "3D creation suite for modeling, animation, and rendering",
    category: "Media",
    upvotes: 1420,
    icon: Code,
    addedDate: new Date("2025-01-01"),
  },
  {
    id: 4,
    name: "LibreOffice",
    description:
      "Complete office suite with word processing, spreadsheets, and presentations",
    category: "Productivity",
    upvotes: 890,
    icon: Code,
    addedDate: new Date("2025-01-01"),
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
    addedDate: new Date("2025-01-02"),
    icon: Code,
    upvotes: 69,
  },
  {
    id: 6,
    name: "Figma",
    description:
      "Collaborative interface design tool with real-time collaboration",
    category: "Design",
    addedDate: new Date("2025-01-01"),
    icon: Figma,
    upvotes: 69,
  },
  {
    id: 7,
    name: "Discord",
    description: "Voice, video and text communication platform for communities",
    category: "Communication",
    addedDate: new Date("2024-12-30"),
    icon: MessageSquare,
    upvotes: 69,
  },
  {
    id: 8,
    name: "OBS Studio",
    description:
      "Free and open source software for video recording and live streaming",
    category: "Media",
    addedDate: new Date("2024-12-28"),
    icon: Video,
    upvotes: 69,
  },
];

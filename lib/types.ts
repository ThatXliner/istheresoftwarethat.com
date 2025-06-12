export interface Feature {
  title: string;
  description: string;
}

export interface Review {
  username: string;
  date: string;
  comment: string;
  isUpvote: boolean;
}

export interface SimilarSoftware {
  id: string;
  name: string;
  shortDescription: string;
}

export interface Software {
  id: string;
  name: string;
  icon: any;
  shortDescription: string;
  longDescription: string;
  features: Feature[];
  systemRequirements: string[];
  license: string;
  installationInstructions: string;
  website: string;
  githubUrl: string;
  lastUpdated: string;
  isActive: boolean;
  upvotes: number;
  platforms: string[];
  categories: string[];
  reviews: Review[];
  similar: SimilarSoftware[];
  isBookmarked?: boolean;
}

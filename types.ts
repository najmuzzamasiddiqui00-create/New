export enum PlanTier {
  FREE = 'Free',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise'
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanTier;
  credits: number; // Tokens or generations remaining
  usageThisMonth: number;
}

export enum ContentType {
  BLOG = 'Blog Post',
  TWEET = 'Twitter Thread',
  EMAIL = 'Cold Email',
  LINKEDIN = 'LinkedIn Post'
}

export interface GenerationHistory {
  id: string;
  type: ContentType;
  topic: string;
  content: string;
  date: string;
}

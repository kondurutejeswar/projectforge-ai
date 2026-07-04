export type Tier = 'Tier 1' | 'Tier 2';

export type Domain =
  | 'Medical AI'
  | 'GenAI'
  | 'Computer Vision'
  | 'IoT'
  | 'Blockchain'
  | 'Cybersecurity'
  | 'NLP';

export interface PricingPlan {
  name: string;
  price: number;
  features: string[];
  highlighted?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  tier: Tier;
  domain: Domain;
  techStack: string[];
  shortDesc: string;
  longDesc: string;
  features: string[];
  demoUrl?: string;
  demoVideoUrl?: string;
  thumbnail: string;
  ieeeBase?: string;
  pricing: PricingPlan[];
}

export interface Testimonial {
  id: string;
  name: string;
  college: string;
  project: string;
  rating: number;
  review: string;
  approved: boolean;
  created_at: string;
}

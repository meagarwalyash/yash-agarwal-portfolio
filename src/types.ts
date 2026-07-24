export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'bn' | 'pa';

export type Theme = 'dark' | 'light' | 'auto';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Marketing' | 'PR' | 'Events' | 'Campaigns' | 'Social Media' | 'Video' | 'Website' | 'Branding';
  client: string;
  metrics: string;
  image: string;
  summary: string;
  fullDetails: {
    challenge: string;
    strategy: string;
    results: string[];
    gallery: string[];
    testimonialQuote?: string;
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  logo: string;
  location: string;
  achievements: string[];
  kpis: { label: string; value: string }[];
  videoThumbnail?: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tag: string;
}

export interface MediaItem {
  id: string;
  publication: string;
  logo: string;
  headline: string;
  date: string;
  excerpt: string;
  url: string;
  readTime: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  linkedinVerified: boolean;
  videoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

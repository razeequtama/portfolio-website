export type SectionId = 
  | 'welcome'
  | 'projects'
  | 'engineering'
  | 'experience'
  | 'tech-stack'
  | 'about'
  | 'contact';

export type PlayingCardSuit = 'spades' | 'diamonds' | 'clubs' | 'hearts';

export interface SectionMeta {
  id: SectionId;
  index: number;
  number: string;
  cardSuit?: PlayingCardSuit;
  cardRank?: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full Stack' | 'Systems' | 'DevTools' | 'Frontend' | 'Cloud';
  techStack: string[];
  featured: boolean;
  previewGradient: string;
  liveUrl?: string;
  githubUrl?: string;
  videoDemoUrl?: string;
  snapshotUrl?: string;
  metrics: string[];
  architectureNotes?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  period: string;
  location: string;
  type?: 'Full-Time' | 'Contract' | 'Education' | string;
  summary?: string;
  achievements: string[];
  techStack?: string[];
  image?: string;
  featuredBadge?: string;
}

export interface SkillItem {
  name: string;
  color?: string;
  level?: number;
  experienceYears?: string;
  highlight?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: SkillItem[];
}

export interface PersonalInterest {
  title: string;
  description: string;
  detail: string;
  tag: string;
}

export interface CoreValue {
  title: string;
  tagline: string;
  description: string;
}

export interface AboutContent {
  headline?: string;
  bioParagraphs: string[];
  personalInterests?: PersonalInterest[];
  coreValues?: CoreValue[];
  careerTrajectory?: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
}

export interface ContactContent {
  email: string;
  location: string;
  availability: string;
  responseTime: string;
  socials: SocialLink[];
  resumeUrl: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  status: string;
  location: string;
  yearsExperience: string;
  projectsShipped: string;
  systemReliability: string;
}

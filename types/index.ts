import { ReactNode } from "react";

// Core Data Types
export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  category?: string;
}

export interface SkillCategory {
  icon: ReactNode;
  title: string;
  description: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string[];
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  link: string;
}

export interface Hackathon {
  name: string;
  project: string;
  description: string;
  position: string;
  date: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

// Component Props Types
export interface ThemeToggleProps {
  className?: string;
}

export interface BGPatternProps extends React.ComponentProps<"div"> {
  variant?: "dots" | "grid" | "diagonal-stripes";
  mask?: "fade-edges" | "fade-center" | "none";
  size?: number;
  fill?: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface SkillCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  link: string;
}

export interface HackathonCardProps {
  name: string;
  project: string;
  description: string;
  position: string;
  date: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

// Layout Component Props
export interface NavigationProps {
  isScrolled?: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export interface HeaderProps {
  className?: string;
}

// Section Component Props
export interface HeroProps {
  className?: string;
}

export interface SkillsProps {
  skills: SkillCategory[];
  className?: string;
}

export interface ProjectsProps {
  projects: Project[];
  className?: string;
}

export interface ExperienceProps {
  experiences: Experience[];
  className?: string;
}

export interface BlogsProps {
  blogs: BlogPost[];
  className?: string;
}

export interface HackathonsProps {
  hackathons: Hackathon[];
  className?: string;
}

export interface ContactProps {
  className?: string;
}

// Animation and Background Component Props
export interface StarFieldProps {
  starCount?: number;
  className?: string;
}

export interface FloatingGeometryProps {
  shapeCount?: number;
  className?: string;
}

export interface HeroBackgroundProps {
  className?: string;
}

export interface CosmicGradientProps {
  className?: string;
}

// Utility Types
export type MaskType = "fade-edges" | "fade-center" | "none";
export type PatternVariant = "dots" | "grid" | "diagonal-stripes";
export type ThemeMode = "light" | "dark";

// Common Props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Animation Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

// Portfolio Data Collections
export interface PortfolioData {
  projects: Project[];
  skills: SkillCategory[];
  experiences: Experience[];
  blogs: BlogPost[];
  hackathons: Hackathon[];
}

// Form Types (for contact section)
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// SEO and Metadata Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}
// Re-export common types
export * from "./common";
export * from "./animations";

// Explicitly resolve AnimationState conflict by choosing the animations version
export type { AnimationState } from "./animations";

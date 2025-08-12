// Application constants and default values

// Animation defaults
export const ANIMATION_DEFAULTS = {
  duration: 0.5,
  delay: 0,
  ease: "easeInOut",
  staggerChildren: 0.1,
} as const;

// Background animation defaults
export const STAR_FIELD_DEFAULTS = {
  starCount: 50,
  minSize: 1,
  maxSize: 3,
  animationDuration: 2,
  twinkleDelay: 2,
} as const;

export const FLOATING_GEOMETRY_DEFAULTS = {
  shapeCount: 8,
  minSize: 20,
  maxSize: 60,
  animationDuration: 8,
  rotationSpeed: 1,
} as const;

export const HERO_BACKGROUND_DEFAULTS = {
  gridSize: 50,
  particleCount: 20,
  orbCount: 2,
  animationSpeed: 1,
} as const;

// Pattern defaults
export const BG_PATTERN_DEFAULTS = {
  size: 24,
  fill: "rgba(255,255,255,0.1)",
  variant: "grid" as const,
  mask: "none" as const,
} as const;

// Responsive breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Theme configuration
export const THEME_CONFIG = {
  defaultTheme: "dark" as const,
  storageKey: "portfolio-theme",
  enableSystemTheme: true,
} as const;

// Navigation configuration
export const NAVIGATION_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

// Social media links
export const SOCIAL_LINKS = [
  {
    platform: "GitHub",
    url: "https://github.com",
    label: "GitHub Profile",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    label: "LinkedIn Profile",
  },
  {
    platform: "Email",
    url: "mailto:contact@example.com",
    label: "Email Contact",
  },
] as const;

// Form validation
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minNameLength: 2,
  maxNameLength: 50,
  minMessageLength: 10,
  maxMessageLength: 1000,
} as const;

// Performance configuration
export const PERFORMANCE_CONFIG = {
  imageQuality: 85,
  lazyLoadOffset: 100,
  maxConcurrentAnimations: 5,
  enableGPUAcceleration: true,
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  title: "John Doe - Portfolio",
  description: "Full Stack Developer & AI Enthusiast",
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript"],
  image: "/og-image.jpg",
  twitterCard: "summary_large_image",
} as const;

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 10000,
  retryAttempts: 3,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: "portfolio-theme",
  preferences: "portfolio-preferences",
  visitCount: "portfolio-visit-count",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection.",
  validation: "Please check your input and try again.",
  notFound: "The requested resource was not found.",
  serverError: "Server error. Please try again later.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  contactForm: "Thank you for your message! I'll get back to you soon.",
  newsletter: "Successfully subscribed to the newsletter!",
  download: "Download started successfully.",
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  enableAnalytics: process.env.NODE_ENV === "production",
  enableServiceWorker: process.env.NODE_ENV === "production",
  enableErrorReporting: process.env.NODE_ENV === "production",
  enablePerformanceMonitoring: true,
} as const;

// Content limits
export const CONTENT_LIMITS = {
  maxProjects: 20,
  maxBlogPosts: 50,
  maxHackathons: 30,
  maxSkills: 20,
  maxExperiences: 10,
} as const;

// Common utility types used across the application

import { ReactNode } from "react";

// Generic component props
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children?: ReactNode;
}

export interface WithOptionalChildren {
  children?: ReactNode;
}

// Event handler types
export interface ClickHandler {
  onClick?: () => void;
}

export interface FormHandler<T = any> {
  onSubmit?: (data: T) => void;
  onChange?: (field: keyof T, value: any) => void;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

// Responsive breakpoint types
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

// Animation states
export type SimpleAnimationState = "idle" | "animating" | "complete";

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: {
    sans: string[];
    mono: string[];
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Validation types
export type ValidationRule<T> = (value: T) => string | null;

export interface FieldValidation<T> {
  required?: boolean;
  rules?: ValidationRule<T>[];
}

export type FormValidation<T> = {
  [K in keyof T]?: FieldValidation<T[K]>;
};

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and sort types
export interface FilterOption<T = string> {
  label: string;
  value: T;
}

export interface SortOption<T = string> {
  label: string;
  value: T;
  direction: "asc" | "desc";
}

export interface FilterState<T = any> {
  filters: Record<string, T>;
  sort?: SortOption;
  search?: string;
}

// Modal and overlay types
export interface ModalProps extends WithClassName, WithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Image types
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

// Social media types
export interface SocialLink {
  platform: string;
  url: string;
  icon: ReactNode;
  label: string;
}

// Analytics and tracking types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Performance monitoring types
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

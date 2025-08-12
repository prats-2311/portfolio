import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Default value utilities for data handling
export const withDefaults = <T extends Record<string, any>>(
  data: Partial<T>,
  defaults: T
): T => {
  return { ...defaults, ...data };
};

// Safe array access with default
export const safeArray = <T>(arr: T[] | undefined | null): T[] => {
  return Array.isArray(arr) ? arr : [];
};

// Safe string access with default
export const safeString = (
  str: string | undefined | null,
  defaultValue = ""
): string => {
  return typeof str === "string" ? str : defaultValue;
};

// Safe number access with default
export const safeNumber = (
  num: number | undefined | null,
  defaultValue = 0
): number => {
  return typeof num === "number" && !isNaN(num) ? num : defaultValue;
};

// Safe boolean access with default
export const safeBoolean = (
  bool: boolean | undefined | null,
  defaultValue = false
): boolean => {
  return typeof bool === "boolean" ? bool : defaultValue;
};

// Format date string for display
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

// Format relative date (e.g., "2 days ago")
export const formatRelativeDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return dateString;
  }
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

// Generate slug from text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Debounce function for search and input handling
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check if running in browser environment
export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

// Local storage utilities with error handling
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (!isBrowser()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  },

  remove: (key: string): void => {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
    }
  },
};

// Array utilities
export const arrayUtils = {
  // Remove duplicates from array
  unique: <T>(arr: T[]): T[] => Array.from(new Set(arr)),

  // Group array by key
  groupBy: <T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> => {
    return arr.reduce((groups, item) => {
      const groupKey = String(item[key]);
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  // Shuffle array
  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Chunk array into smaller arrays
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
};

// URL utilities
export const urlUtils = {
  // Check if URL is external
  isExternal: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  },

  // Add query parameters to URL
  addParams: (url: string, params: Record<string, string>): string => {
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
    return urlObj.toString();
  },
};

// Error handling utilities
export const handleError = (error: unknown, context?: string): void => {
  const message = error instanceof Error ? error.message : "Unknown error";
  const fullMessage = context ? `${context}: ${message}` : message;

  if (process.env.NODE_ENV === "development") {
    console.error(fullMessage, error);
  } else {
    // In production, you might want to send to error reporting service
    console.warn("An error occurred:", fullMessage);
  }
};

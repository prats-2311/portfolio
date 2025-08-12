// Responsive design utilities and helpers

import { useEffect, useState } from "react";

// Breakpoint values (matching Tailwind CSS)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Hook to detect current breakpoint
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= BREAKPOINTS["2xl"]) {
        setBreakpoint("2xl");
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint("xl");
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint("lg");
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint("md");
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint("sm");
      } else if (width >= BREAKPOINTS.xs) {
        setBreakpoint("xs");
      } else {
        setBreakpoint("xs");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}

// Hook to detect if screen is mobile
export function useIsMobile() {
  const breakpoint = useBreakpoint();
  return breakpoint === "xs" || breakpoint === "sm";
}

// Hook to detect if screen is tablet
export function useIsTablet() {
  const breakpoint = useBreakpoint();
  return breakpoint === "md";
}

// Hook to detect if screen is desktop
export function useIsDesktop() {
  const breakpoint = useBreakpoint();
  return breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl";
}

// Hook to get window dimensions
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Touch interaction utilities
export const touchUtils = {
  // Prevent default touch behaviors
  preventScroll: (e: TouchEvent) => {
    e.preventDefault();
  },

  // Handle touch start
  handleTouchStart: (callback: (touch: Touch) => void) => {
    return (e: TouchEvent) => {
      if (e.touches.length === 1) {
        callback(e.touches[0]);
      }
    };
  },

  // Handle touch move
  handleTouchMove: (callback: (touch: Touch) => void) => {
    return (e: TouchEvent) => {
      if (e.touches.length === 1) {
        callback(e.touches[0]);
      }
    };
  },

  // Handle touch end
  handleTouchEnd: (callback: () => void) => {
    return (e: TouchEvent) => {
      callback();
    };
  },

  // Get touch coordinates
  getTouchCoordinates: (touch: Touch) => ({
    x: touch.clientX,
    y: touch.clientY,
  }),

  // Calculate touch distance
  getTouchDistance: (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  },
};

// Responsive grid utilities
export const gridUtils = {
  // Get responsive grid columns based on breakpoint
  getGridCols: (breakpoint: Breakpoint, config: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  }) => {
    return config[breakpoint] || config.lg || 3;
  },

  // Get responsive gap based on breakpoint
  getGridGap: (breakpoint: Breakpoint) => {
    switch (breakpoint) {
      case "xs":
      case "sm":
        return "gap-4";
      case "md":
        return "gap-6";
      case "lg":
      case "xl":
      case "2xl":
        return "gap-8";
      default:
        return "gap-6";
    }
  },

  // Get responsive padding based on breakpoint
  getResponsivePadding: (breakpoint: Breakpoint) => {
    switch (breakpoint) {
      case "xs":
        return "px-4 py-8";
      case "sm":
        return "px-6 py-12";
      case "md":
        return "px-8 py-16";
      case "lg":
      case "xl":
      case "2xl":
        return "px-12 py-20";
      default:
        return "px-6 py-12";
    }
  },
};

// Animation utilities for mobile
export const mobileAnimationUtils = {
  // Reduced motion for mobile devices
  getReducedMotionConfig: () => ({
    duration: 0.3,
    ease: "easeOut",
  }),

  // Touch-friendly animation config
  getTouchFriendlyConfig: () => ({
    scale: 1.02,
    duration: 0.2,
  }),

  // Mobile-optimized stagger config
  getMobileStaggerConfig: () => ({
    staggerChildren: 0.05,
    delayChildren: 0.1,
  }),
};

// Accessibility utilities
export const a11yUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Check if user prefers high contrast
  prefersHighContrast: () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-contrast: high)").matches;
  },

  // Focus management utilities
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);
    return () => element.removeEventListener("keydown", handleTabKey);
  },
};

// Performance utilities
export const performanceUtils = {
  // Debounce function for resize events
  debounce: <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => void>(
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
  },

  // Intersection Observer for lazy loading
  createIntersectionObserver: (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) => {
    if (typeof window === "undefined") return null;
    
    return new IntersectionObserver(callback, {
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    });
  },
};

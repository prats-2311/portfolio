// Animation and motion-related types

import { Variants, Transition, MotionProps } from "framer-motion";

// Framer Motion animation variants
export interface AnimationVariants {
  initial?: any;
  animate?: any;
  exit?: any;
  hover?: any;
  tap?: any;
  focus?: any;
  whileInView?: any;
}

// Common animation configurations
export interface FadeInConfig {
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
}

export interface SlideInConfig {
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
}

export interface ScaleConfig {
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
}

export interface RotateConfig {
  from?: number;
  to?: number;
  duration?: number;
  repeat?: number;
  ease?: string;
}

// Background animation types
export interface StarConfig {
  count?: number;
  minSize?: number;
  maxSize?: number;
  animationDuration?: number;
  twinkleDelay?: number;
}

export interface GeometryConfig {
  count?: number;
  minSize?: number;
  maxSize?: number;
  animationDuration?: number;
  rotationSpeed?: number;
}

export interface ParticleConfig {
  count?: number;
  speed?: number;
  size?: number;
  color?: string;
  opacity?: number;
}

// Grid and pattern animation types
export interface GridAnimationConfig {
  size?: number;
  color?: string;
  opacity?: number;
  animationSpeed?: number;
}

export interface OrbConfig {
  size?: number;
  color?: string;
  opacity?: number;
  animationDuration?: number;
  blur?: number;
}

// Scroll-based animation types
export interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ParallaxConfig {
  speed?: number;
  direction?: "vertical" | "horizontal";
  offset?: number;
}

// Hover and interaction animation types
export interface HoverAnimationConfig {
  scale?: number;
  rotate?: number;
  y?: number;
  x?: number;
  duration?: number;
}

export interface CardHoverConfig extends HoverAnimationConfig {
  shadowIntensity?: number;
  borderGlow?: boolean;
}

// Page transition types
export interface PageTransitionConfig {
  duration?: number;
  ease?: string;
  staggerChildren?: number;
}

// Loading animation types
export interface LoadingAnimationConfig {
  type?: "spinner" | "dots" | "bars" | "pulse";
  size?: "sm" | "md" | "lg";
  color?: string;
  speed?: number;
}

// Text animation types
export interface TextAnimationConfig {
  type?: "typewriter" | "fade" | "slide" | "bounce";
  speed?: number;
  delay?: number;
  stagger?: number;
}

// Component-specific animation props
export interface AnimatedComponentProps {
  variants?: Variants;
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
  };
}

// Motion component wrapper types
export interface MotionWrapperProps extends AnimatedComponentProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Animation hook types
export interface UseAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  controls: any;
}

export interface UseScrollAnimationReturn {
  scrollY: any;
  scrollYProgress: any;
  isScrolled: boolean;
}

// Performance optimization types
export interface AnimationPerformanceConfig {
  reduceMotion?: boolean;
  enableGPUAcceleration?: boolean;
  optimizeFor?: "performance" | "quality";
  maxConcurrentAnimations?: number;
}

// Animation state management
export interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  progress: number;
}

export interface AnimationControls {
  play: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
  setProgress: (progress: number) => void;
}

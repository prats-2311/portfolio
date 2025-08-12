"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GridAnimationConfig,
  OrbConfig,
  ParticleConfig,
} from "@/types/animations";

interface HeroBackgroundProps {
  className?: string;
  gridConfig?: GridAnimationConfig;
  orbConfig?: OrbConfig;
  particleConfig?: ParticleConfig;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  animationDuration: number;
  delay: number;
}

export function HeroBackground({
  className = "",
  gridConfig = {},
  orbConfig = {},
  particleConfig = {},
}: HeroBackgroundProps) {
  const {
    size: gridSize = 50,
    color: gridColor = "rgba(59, 130, 246, 0.1)",
    animationSpeed = 20,
  } = gridConfig;

  const {
    size: orbSize = 256,
    opacity: orbOpacity = 0.3,
    animationDuration: orbDuration = 4,
    blur = 3,
  } = orbConfig;

  const {
    count: particleCount = 20,
    speed: particleSpeed = 3,
    size: particleSize = 2,
    color: particleColor = "rgba(6, 182, 212, 0.4)",
    opacity: particleOpacity = 1,
  } = particleConfig;

  // Generate particles with random positions and properties
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: particleSpeed + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [particleCount, particleSpeed]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
        animate={{
          backgroundPosition: ["0px 0px", `${gridSize}px ${gridSize}px`],
        }}
        transition={{
          duration: animationSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glowing Orbs */}
      <motion.div
        className={`absolute top-1/4 left-1/4 bg-blue-500/10 rounded-full blur-${blur}xl`}
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [orbOpacity * 0.5, orbOpacity, orbOpacity * 0.5],
        }}
        transition={{
          duration: orbDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute bottom-1/4 right-1/4 bg-purple-500/10 rounded-full blur-${blur}xl`}
        style={{
          width: `${orbSize * 1.5}px`,
          height: `${orbSize * 1.5}px`,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [orbOpacity * 0.4, orbOpacity * 0.8, orbOpacity * 0.4],
        }}
        transition={{
          duration: orbDuration + 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particleSize}px`,
            height: `${particleSize}px`,
            backgroundColor: particleColor,
            opacity: particleOpacity,
          }}
          animate={{
            y: [-100, -200],
            opacity: [0, particleOpacity, 0],
          }}
          transition={{
            duration: particle.animationDuration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default HeroBackground;

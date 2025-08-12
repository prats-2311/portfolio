"use client";

import React from "react";
import { motion } from "framer-motion";
import { StarConfig } from "@/types/animations";

interface StarFieldProps {
  count?: number;
  className?: string;
  config?: StarConfig;
}

interface Star {
  id: number;
  left: string;
  top: string;
  animationDelay: number;
  animationDuration: number;
  size: number;
}

export function StarField({
  count = 50,
  className = "",
  config = {},
}: StarFieldProps) {
  const {
    minSize = 1,
    maxSize = 2,
    animationDuration = 3,
    twinkleDelay = 2,
  } = config;

  // Generate stars with random positions and properties
  const stars: Star[] = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: Math.random() * twinkleDelay,
      animationDuration: animationDuration + Math.random() * 2,
      size: minSize + Math.random() * (maxSize - minSize),
    }));
  }, [count, minSize, maxSize, animationDuration, twinkleDelay]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.animationDuration,
            repeat: Infinity,
            delay: star.animationDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default StarField;

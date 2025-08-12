"use client";

import React from "react";
import { motion } from "framer-motion";
import { GeometryConfig } from "@/types/animations";

interface FloatingGeometryProps {
  count?: number;
  className?: string;
  config?: GeometryConfig;
}

interface GeometryShape {
  id: number;
  left: string;
  top: string;
  width: number;
  height: number;
  animationDuration: number;
  rotationSpeed: number;
}

export function FloatingGeometry({
  count = 8,
  className = "",
  config = {},
}: FloatingGeometryProps) {
  const {
    minSize = 20,
    maxSize = 60,
    animationDuration = 8,
    rotationSpeed = 4,
  } = config;

  // Generate geometric shapes with random positions and properties
  const shapes: GeometryShape[] = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = minSize + Math.random() * (maxSize - minSize);
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: size,
        height: size,
        animationDuration: animationDuration + Math.random() * rotationSpeed,
        rotationSpeed: rotationSpeed + Math.random() * 2,
      };
    });
  }, [count, minSize, maxSize, animationDuration, rotationSpeed]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute border border-primary/20 rounded-lg"
          style={{
            left: shape.left,
            top: shape.top,
            width: `${shape.width}px`,
            height: `${shape.height}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: shape.animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default FloatingGeometry;

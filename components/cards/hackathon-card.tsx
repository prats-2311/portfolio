"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, Trophy } from "lucide-react";
import { HackathonCardProps } from "@/types";

export function HackathonCard({
  name,
  project,
  description,
  position,
  date,
  tech,
  image,
  github,
  demo,
}: HackathonCardProps) {
  const getPositionColor = (position: string) => {
    const pos = position.toLowerCase();
    if (
      pos.includes("1st") ||
      pos.includes("winner") ||
      pos.includes("first")
    ) {
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    }
    if (pos.includes("2nd") || pos.includes("second")) {
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
    if (pos.includes("3rd") || pos.includes("third")) {
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    }
    return "bg-primary/10 text-primary border-primary/20";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={project}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Position badge overlay */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getPositionColor(
              position
            )}`}
          >
            <Trophy className="w-3 h-3 inline mr-1" />
            {position}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {project}
          </h3>
        </div>

        <p className="text-primary font-medium mb-2 text-sm sm:text-base">
          {name}
        </p>

        <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <motion.span
              key={item}
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            {date}
          </span>

          <div className="flex gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HackathonCard;

"use client";
import Image from 'next/image';

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { ProjectCardProps } from "@/types";
import { cn } from "@/lib/utils";

export function ProjectCard({
  title,
  description,
  tech,
  image,
  github,
  demo,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10",
        featured ? "md:col-span-2 md:row-span-2" : ""
      )}
    >
      <div className="aspect-video overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
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

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default ProjectCard;

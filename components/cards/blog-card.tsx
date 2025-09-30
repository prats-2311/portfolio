"use client";
import Image from "next/image";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { BlogCardProps } from "@/types";

export function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  tags,
  image,
  link,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
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

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground mb-4 text-sm sm:text-base line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {readTime}
          </span>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group/link font-medium"
        >
          Read More
          <ArrowRight className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
}

export default BlogCard;

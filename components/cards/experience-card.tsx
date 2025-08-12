"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { ExperienceCardProps } from "@/types";

export function ExperienceCard({
  company,
  role,
  period,
  location,
  description,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 border-l border-border last:border-l-0 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg"
      />

      {/* Timeline line extension for last item */}
      <div className="absolute -left-px top-4 w-px h-full bg-gradient-to-b from-border to-transparent last:hidden" />

      <div className="space-y-3">
        <div className="space-y-1">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            {role}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-medium text-lg"
          >
            {company}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            {period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            {location}
          </span>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-2 text-muted-foreground"
        >
          {description.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 text-sm leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
              <span className="hover:text-foreground transition-colors">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;

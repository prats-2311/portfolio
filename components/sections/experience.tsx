"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExperienceCard } from "../cards/experience-card";
import { Experience } from "@/types";
import { cn } from "@/lib/utils";
import { getTotalYearsOfExperience } from "@/lib/data/experience";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceProps {
  experiences: Experience[];
  className?: string;
}

export function ExperienceSection({ experiences, className }: ExperienceProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Get total years of experience
  const totalYears = getTotalYearsOfExperience();

  return (
    <section
      id="experience"
      className={cn(
        "py-20 bg-gradient-to-b from-background to-muted/20",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            My journey through various roles and companies, building expertise
            in Software development and leading innovative projects.
          </motion.p>
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {totalYears}+
              </div>
              <div className="text-muted-foreground">Years Experience</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {experiences.length}
              </div>
              <div className="text-muted-foreground">Positions Held</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {
                  new Set(
                    experiences.map(
                      (exp) =>
                        exp.location.split(",")[1]?.trim() || exp.location
                    )
                  ).size
                }
              </div>
              <div className="text-muted-foreground">Locations</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />

          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.role}`}
              variants={itemVariants}
              className={cn(
                "relative flex items-center mb-12 last:mb-0",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg transform -translate-x-2 md:-translate-x-2 z-10"
              />

              {/* Content */}
              <div
                className={cn(
                  "w-full md:w-1/2 pl-12 md:pl-0",
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                )}
              >
                <ExperienceCard
                  company={experience.company}
                  role={experience.role}
                  period={experience.period}
                  location={experience.location}
                  description={experience.description}
                />
              </div>

              {/* Spacer for desktop */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Let&apos;s Discuss Opportunities
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default ExperienceSection;

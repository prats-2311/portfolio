"use client";

import React from "react";
import { motion } from "framer-motion";
import { HackathonCard } from "../cards/hackathon-card";
import { Hackathon } from "@/types";
import { cn } from "@/lib/utils";
import { Trophy, Calendar, Code, Target } from "lucide-react";

interface HackathonsProps {
  hackathons: Hackathon[];
  className?: string;
}

export function Hackathons({ hackathons, className }: HackathonsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Calculate stats
  const winningPositions = ["1st", "2nd", "3rd", "winner", "place"];
  const wins = hackathons.filter((hackathon) =>
    winningPositions.some((position) =>
      hackathon.position.toLowerCase().includes(position)
    )
  ).length;

  const allTechs = Array.from(new Set(hackathons.flatMap(h => h.tech)));
  const winRate = hackathons.length > 0 ? Math.round((wins / hackathons.length) * 100) : 0;

  return (
    <section
      id="hackathons"
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
            Hackathon Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Showcasing innovative projects built during competitive hackathons,
            demonstrating rapid prototyping skills and creative problem-solving.
          </motion.p>
        </motion.div>

        {/* Hackathon Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {hackathons.length}
              </div>
              <div className="text-muted-foreground">Hackathons</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {wins}
              </div>
              <div className="text-muted-foreground">Awards Won</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {winRate}%
              </div>
              <div className="text-muted-foreground">Win Rate</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {allTechs.length}
              </div>
              <div className="text-muted-foreground">Technologies</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hackathons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.name}
              variants={itemVariants}
              className="h-full"
            >
              <HackathonCard
                name={hackathon.name}
                project={hackathon.project}
                description={hackathon.description}
                position={hackathon.position}
                date={hackathon.date}
                tech={hackathon.tech}
                image={hackathon.image}
                github={hackathon.github}
                demo={hackathon.demo}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h4 className="font-semibold text-foreground">Competition Success</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Consistently placed in top 3 positions across multiple hackathons,
                  demonstrating strong problem-solving and rapid development skills.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Code className="w-6 h-6 text-blue-500" />
                  <h4 className="font-semibold text-foreground">Technical Diversity</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Worked with diverse technology stacks including web development,
                  mobile apps, AI/ML, and game development frameworks.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-foreground">Innovation Focus</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Created solutions addressing real-world problems in sustainability,
                  mental health, education, and space exploration.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <h4 className="font-semibold text-foreground">Rapid Prototyping</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Delivered fully functional prototypes within 24-48 hour timeframes,
                  showcasing efficient development and project management skills.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById("projects");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hackathons;

"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import {
  Hero,
  Skills,
  Projects,
  ExperienceSection,
  Blogs,
  Hackathons,
  Contact
} from "@/components/sections";

// Import data
import { skillsData } from "@/lib/data/skills";
import { projectsData } from "@/lib/data/projects";
import { experienceData } from "@/lib/data/experience";
import { blogsData } from "@/lib/data/blogs";
import { hackathonsData } from "@/lib/data/hackathons";

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Hero />
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skills skills={skillsData} />
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Projects projects={projectsData} />
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ExperienceSection experiences={experienceData} />
        </motion.div>

        {/* Blogs Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Blogs blogs={blogsData} />
        </motion.div>

        {/* Hackathons Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Hackathons hackathons={hackathonsData} />
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Contact />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2024 Prateek Srivastava. All rights reserved.
            </div>
            <div className="text-muted-foreground text-sm">
              Built with Next.js, TypeScript, and Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Youtube, Mail } from "lucide-react";
import Header from "@/components/layout/header";
import {
  Hero,
  Skills,
  Projects,
  ExperienceSection,
  Contact,
} from "@/components/sections";

// Import data
import { skillsData } from "@/lib/data/skills";
import { projectsData } from "@/lib/data/projects";
import { experienceData } from "@/lib/data/experience";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure smooth initial load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        className={`relative ${
          !isLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        role="main"
        itemScope
        itemType="https://schema.org/Person"
      >
        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h1 itemProp="name">Prateek Srivastava - Software Developer</h1>
          <p itemProp="description">
            Prateek Srivastava is an experienced Software Developer with 3+
            years of professional experience specializing in Angular, Next.js,
            Python, and payment gateway systems. Currently working at Amino
            Technology Limited in Delhi, India. Previously worked at Sugoi Labs
            developing logistics optimization solutions.
          </p>
          <span itemProp="jobTitle">Software Developer</span>
          <span
            itemProp="worksFor"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <span itemProp="name">Amino Technology Limited</span>
          </span>
          <address
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span itemProp="addressLocality">Delhi</span>
            <span itemProp="addressCountry">India</span>
          </address>
        </div>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Skills skills={skillsData} />
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Projects projects={projectsData} />
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <ExperienceSection experiences={experienceData} />
        </motion.div>

        {/* Blogs Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Blogs blogs={blogsData} />
        </motion.div> */}

        {/* Hackathons Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Hackathons hackathons={hackathonsData} />
        </motion.div> */}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
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
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/prats-2311"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/prateek-srivastava-44b37910b"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.youtube.com/@cseCatalyst"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:prateek.srivastava2311@gmail.com"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

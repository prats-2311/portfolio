"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { HeroBackground } from "../ui/hero-background";
import { StarField } from "../ui/star-field";
import { FloatingGeometry } from "../ui/floating-geometry";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
        <StarField count={100} className="opacity-40" />
        <FloatingGeometry count={12} className="opacity-30" />
        <HeroBackground className="opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Prateek Srivastava
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6"
          >
            Full Stack Developer & Product Engineer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I build innovative digital solutions with modern web technologies,
            specializing in full-stack development, design tools, and educational platforms.
            Passionate about creating impactful products that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              View My Work
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
            >
              Get In Touch
              <Mail className="w-4 h-4" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
            >
              Download CV
              <Download className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/prats-2311"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://docker.com/prats2311"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:prateek.srivastava2311@gmail.com"
              className="p-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

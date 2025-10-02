"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "../cards/project-card";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
  className?: string;
}

export function Projects({ projects, className }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Reset to "All" if current category doesn't exist in projects
  React.useEffect(() => {
    const availableCategories = Array.from(
      new Set(
        projects
          .map((p) => p.category)
          .filter(
            (cat): cat is string =>
              Boolean(cat) && cat !== undefined && cat.trim() !== ""
          )
      )
    );

    if (
      selectedCategory !== "All" &&
      !availableCategories.includes(selectedCategory)
    ) {
      setSelectedCategory("All");
    }
  }, [projects, selectedCategory]);

  // Get unique categories - ensure we only have string values
  const categories = [
    "All",
    ...Array.from(
      new Set(
        projects
          .map((p) => p.category)
          .filter(
            (cat): cat is string =>
              Boolean(cat) && cat !== undefined && cat.trim() !== ""
          )
      )
    ).sort(),
  ];

  // Filter projects based on selected category with better error handling
  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "All") {
      return projects;
    }
    return projects.filter((project) => {
      return (
        project.category && project.category.trim() === selectedCategory.trim()
      );
    });
  }, [projects, selectedCategory]);

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const regularProjects = filteredProjects.filter(
    (project) => !project.featured
  );

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

  return (
    <section
      id="projects"
      className={cn(
        "py-20 bg-gradient-to-b from-muted/20 to-background",
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
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my recent work, featuring Software applications,
            AI-powered solutions, and innovative web experiences.
          </motion.p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Mobile Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter: {selectedCategory}
            </motion.button>

            {/* Desktop Filter Buttons */}
            <div className="hidden sm:flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFilterOpen(false);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="sm:hidden w-full max-w-xs"
                >
                  <div className="flex flex-wrap gap-2 p-4 border border-border rounded-lg bg-background">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "border border-border hover:bg-accent"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Featured Projects */}
        <AnimatePresence mode="wait">
          {featuredProjects.length > 0 && (
            <motion.div
              key={`featured-${selectedCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mb-16"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Featured Work
              </motion.h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={`${project.title}-${selectedCategory}`}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      tech={project.tech}
                      image={project.image}
                      github={project.github}
                      demo={project.demo}
                      featured={project.featured}
                      videoUrl={project.videoUrl}
                      status={project.status}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular Projects */}
        <AnimatePresence mode="wait">
          {regularProjects.length > 0 && (
            <motion.div
              key={`regular-${selectedCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Other Projects
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProjects.map((project, index) => (
                  <motion.div
                    key={`${project.title}-${selectedCategory}`}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      tech={project.tech}
                      image={project.image}
                      github={project.github}
                      demo={project.demo}
                      featured={project.featured}
                      videoUrl={project.videoUrl}
                      status={project.status}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Projects Message */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 && (
            <motion.div
              key={`no-projects-${selectedCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No projects found in the &quot;{selectedCategory}&quot;
                category.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("All")}
                className="mt-4 px-4 py-2 text-primary hover:text-primary/80 transition-colors"
              >
                View All Projects
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

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
            Let&apos;s Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;

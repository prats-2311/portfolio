"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "../cards/blog-card";
import { BlogPost } from "@/types";
import { cn } from "@/lib/utils";
import { Search, Calendar, Clock, Tag } from "lucide-react";

interface BlogsProps {
  blogs: BlogPost[];
  className?: string;
}

export function Blogs({ blogs, className }: BlogsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  // Get unique tags
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));
  const tags = ["All", ...allTags];

  // Filter blogs based on search and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchTerm === "" || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Sort blogs by date (newest first)
  const sortedBlogs = filteredBlogs.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayedBlogs = sortedBlogs.slice(0, visibleBlogs);
  const hasMoreBlogs = sortedBlogs.length > visibleBlogs;

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

  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => prev + 6);
  };

  // Calculate total read time
  const totalReadTime = blogs.reduce((total, blog) => {
    const minutes = parseInt(blog.readTime.match(/\d+/)?.[0] || "0");
    return total + minutes;
  }, 0);

  return (
    <section
      id="blogs"
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
            Latest Blog Posts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Sharing insights, tutorials, and thoughts on web development,
            technology trends, and software engineering best practices.
          </motion.p>
        </motion.div>

        {/* Blog Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-2">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {blogs.length}
              </div>
              <div className="text-sm text-muted-foreground">Articles Published</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {totalReadTime}
              </div>
              <div className="text-sm text-muted-foreground">Minutes of Content</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 rounded-xl border bg-background/50 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-2">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {allTags.length}
              </div>
              <div className="text-sm text-muted-foreground">Topics Covered</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.slice(0, 6).map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchTerm}-${selectedTag}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {displayedBlogs.map((blog, index) => (
              <motion.div
                key={blog.title}
                variants={itemVariants}
                className="h-full"
              >
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  date={blog.date}
                  readTime={blog.readTime}
                  tags={blog.tags}
                  image={blog.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              No articles found matching your search criteria.
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMoreBlogs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMoreBlogs}
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}

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
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Blogs;

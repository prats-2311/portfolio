"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";
import Navigation from "./navigation";
import { ThemeToggle } from "../ui/theme-toggle";

interface HeaderProps {
  isScrolled?: boolean;
}

export default function Header({ isScrolled: propIsScrolled }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(propIsScrolled || false);
  const { scrollY } = useScroll();

  // Handle scroll-based styling changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isMobileMenuOpen && !target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-primary"
        >
          Prateek Srivastava
        </motion.div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4">
          <Navigation />
          <ThemeToggle className="hidden md:flex" />
        </div>

        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Navigation
            isMobile={true}
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>
      </nav>
    </motion.header>
  );
}

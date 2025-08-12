"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface NavigationItem {
  href: string;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blogs", label: "Blogs" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function smoothScrollTo(elementId: string) {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function DesktopNavigation() {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

function MobileNavigation({ isOpen, onToggle }: MobileNavigationProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    smoothScrollTo(href);
    onToggle(); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden text-foreground"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border absolute top-full left-0 right-0"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navigation({
  isMobile = false,
  isOpen = false,
  onToggle,
}: NavigationProps) {
  if (isMobile) {
    return (
      <MobileNavigation isOpen={isOpen} onToggle={onToggle || (() => {})} />
    );
  }

  return <DesktopNavigation />;
}

export { DesktopNavigation, MobileNavigation };

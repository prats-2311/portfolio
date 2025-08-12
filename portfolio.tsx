"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Code, 
  Palette, 
  Smartphone, 
  Server, 
  Database, 
  Globe,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Star,
  Calendar,
  MapPin
} from 'lucide-react';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setIsDark(!isDark)}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "transform translate-x-0 bg-zinc-800" 
              : "transform translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-gray-700" 
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-4 h-4 text-gray-500" 
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              className="w-4 h-4 text-black" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface BGPatternProps extends React.ComponentProps<'div'> {
  variant?: 'dots' | 'grid' | 'diagonal-stripes';
  mask?: 'fade-edges' | 'fade-center' | 'none';
  size?: number;
  fill?: string;
}

const maskClasses = {
  'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
  'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
  'none': '',
};

function getBgImage(variant: string, fill: string, size: number) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    default:
      return undefined;
  }
}

function BGPattern({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = 'rgba(255,255,255,0.1)',
  className,
  style,
  ...props
}: BGPatternProps) {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        ...style,
      }}
      {...props}
    />
  );
}

// Interstellar Background Components
function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function FloatingGeometry() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-primary/20 rounded-lg"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CosmicGradient() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-cyan-900/10 dark:from-purple-900/20 dark:via-blue-900/10 dark:to-cyan-900/20" />
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-100, -200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

function ProjectCard({ title, description, tech, image, github, demo, featured }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
        featured ? "md:col-span-2 md:row-span-2" : ""
      )}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {github && (
            <a
              href={github}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

function SkillCard({ icon, title, description, skills }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  link: string;
}

function BlogCard({ title, excerpt, date, readTime, tags, image, link }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <span>{date}</span>
          <span>{readTime} read</span>
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Read More
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.article>
  );
}

interface HackathonCardProps {
  name: string;
  project: string;
  description: string;
  position: string;
  date: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

function HackathonCard({ name, project, description, position, date, tech, image, github, demo }: HackathonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={project}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">{project}</h3>
          <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 w-fit">
            {position}
          </span>
        </div>
        <p className="text-primary font-medium mb-2 text-sm sm:text-base">{name}</p>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xs sm:text-sm text-muted-foreground">{date}</span>
          <div className="flex gap-3">
            {github && (
              <a
                href={github}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ company, role, period, location, description }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 border-l border-border last:border-l-0"
    >
      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{role}</h3>
        <p className="text-primary font-medium">{company}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        </div>
        <ul className="space-y-1 text-muted-foreground">
          {description.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function PortfolioWebsite() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["Vue.js", "Firebase", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      tech: ["React", "API Integration", "Charts"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio with modern animations",
      tech: ["Next.js", "Framer Motion", "TypeScript"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    }
  ];

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces",
      skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend Development",
      description: "Building scalable server-side applications",
      skills: ["Node.js", "Python", "Express", "Django", "REST APIs"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database & Cloud",
      description: "Managing data and cloud infrastructure",
      skills: ["MongoDB", "PostgreSQL", "AWS", "Firebase", "Docker"]
    },
        {
      icon: <Star className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Intelligent systems and data-driven solutions",
      skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"]
    }
  ];

    const experiences = [
    {
      company: "Tech Innovations Inc.",
      role: "Senior Full Stack Developer",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ]
    },
    {
      company: "StartupXYZ",
      role: "Frontend Developer",
      period: "2020 - 2022",
      location: "Remote",
      description: [
        "Built responsive web applications using React and TypeScript",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Optimized application performance improving load times by 40%"
      ]
    },
    {
      company: "Digital Agency",
      role: "Junior Developer",
      period: "2019 - 2020",
      location: "New York, NY",
      description: [
        "Developed client websites using modern web technologies",
        "Participated in agile development processes",
        "Gained experience in full-stack development"
      ]
    }
  ];

  const blogs = [
    {
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Learn how to structure large React applications using TypeScript, best practices for component architecture, and advanced patterns for maintainable code.",
      date: "Dec 15, 2023",
      readTime: "8 min",
      tags: ["React", "TypeScript", "Architecture"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "The Future of Web Development: AI and Machine Learning",
      excerpt: "Exploring how artificial intelligence is revolutionizing web development, from automated testing to intelligent code generation and user experience optimization.",
      date: "Nov 28, 2023",
      readTime: "12 min",
      tags: ["AI", "Machine Learning", "Web Dev"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "Optimizing Performance in Modern Web Applications",
      excerpt: "Deep dive into performance optimization techniques including code splitting, lazy loading, caching strategies, and monitoring tools for better user experience.",
      date: "Nov 10, 2023",
      readTime: "10 min",
      tags: ["Performance", "Optimization", "Web Vitals"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "Microservices Architecture: Lessons Learned",
      excerpt: "Real-world insights from implementing microservices architecture, common pitfalls to avoid, and best practices for distributed systems.",
      date: "Oct 22, 2023",
      readTime: "15 min",
      tags: ["Microservices", "Architecture", "Backend"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "A comprehensive guide to modern CSS layout techniques, comparing Grid and Flexbox with practical examples and use cases for responsive design.",
      date: "Oct 5, 2023",
      readTime: "6 min",
      tags: ["CSS", "Layout", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "Securing Your Node.js Applications",
      excerpt: "Essential security practices for Node.js applications including authentication, authorization, data validation, and protection against common vulnerabilities.",
      date: "Sep 18, 2023",
      readTime: "11 min",
      tags: ["Node.js", "Security", "Backend"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      link: "#"
    }
  ];

  const hackathons = [
    {
      name: "TechCrunch Disrupt 2023",
      project: "EcoTrack",
      description: "AI-powered carbon footprint tracking app that helps users reduce their environmental impact through personalized recommendations and gamification.",
      position: "1st Place",
      date: "Oct 2023",
      tech: ["React Native", "Python", "TensorFlow", "Firebase"],
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      name: "NASA Space Apps Challenge",
      project: "Stellar Navigator",
      description: "Interactive 3D space exploration platform using real NASA data to visualize celestial bodies and plan space missions.",
      position: "2nd Place",
      date: "Sep 2023",
      tech: ["Three.js", "React", "NASA APIs", "WebGL"],
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      name: "Global Health Hackathon",
      project: "MediConnect",
      description: "Telemedicine platform connecting rural patients with healthcare providers, featuring real-time video consultations and AI symptom analysis.",
      position: "3rd Place",
      date: "Aug 2023",
      tech: ["Vue.js", "WebRTC", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      name: "FinTech Innovation Challenge",
      project: "CryptoLearn",
      description: "Educational platform for cryptocurrency and blockchain technology with interactive simulations and risk-free trading practice.",
      position: "Finalist",
      date: "Jul 2023",
      tech: ["Next.js", "Blockchain APIs", "Chart.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      name: "Smart City Hackathon",
      project: "TrafficFlow AI",
      description: "Machine learning solution for optimizing traffic light timing based on real-time traffic data and pedestrian patterns.",
      position: "Winner - Best AI Solution",
      date: "Jun 2023",
      tech: ["Python", "OpenCV", "TensorFlow", "IoT Sensors"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      name: "Climate Change Hackathon",
      project: "GreenCommute",
      description: "Mobile app that gamifies sustainable transportation choices with rewards, social challenges, and carbon offset tracking.",
      position: "People's Choice Award",
      date: "May 2023",
      tech: ["Flutter", "Firebase", "Google Maps API", "Dart"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      github: "#",
      demo: "#"
    }
  ];

    return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Interstellar Background Elements */}
      <CosmicGradient />
      <StarField />
      <FloatingGeometry />
      <BGPattern variant="dots" mask="fade-edges" size={32} />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary"
          >
            John Doe
          </motion.div>

                    {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">About</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">Skills</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">Projects</a>
            <a href="#blogs" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">Blogs</a>
            <a href="#hackathons" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">Hackathons</a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">Experience</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">Contact</a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
            >
                            <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#skills" className="block text-muted-foreground hover:text-foreground transition-colors">Skills</a>
                <a href="#projects" className="block text-muted-foreground hover:text-foreground transition-colors">Projects</a>
                <a href="#blogs" className="block text-muted-foreground hover:text-foreground transition-colors">Blogs</a>
                <a href="#hackathons" className="block text-muted-foreground hover:text-foreground transition-colors">Hackathons</a>
                <a href="#experience" className="block text-muted-foreground hover:text-foreground transition-colors">Experience</a>
                <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

            {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Full Stack
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              I create modern, responsive web applications with cutting-edge technologies
            </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors text-sm sm:text-base"
              >
                Download CV
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm a passionate full-stack developer with 5+ years of experience building 
              scalable web applications. I love turning complex problems into simple, 
              beautiful designs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I specialize in modern web technologies and have experience across the full development stack
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </section>

            {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blogs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sharing my thoughts and insights on web development, technology trends, and best practices
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Hackathons Section */}
      <section id="hackathons" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hackathon Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Competitive programming events where I've built innovative solutions under time constraints
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon, index) => (
              <HackathonCard key={index} {...hackathon} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the companies I've had the pleasure to work with
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              I'm always open to discussing new opportunities and interesting projects
            </p>

            <div className="flex justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:john@example.com"
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com"
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com"
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default PortfolioWebsite;

import { Project } from "@/types";
import { validateProject } from "@/lib/validation";

// Sample projects data - replace with actual portfolio projects
export const projectsData: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    image: "/images/projects/ecommerce-platform.jpg",
    github: "https://github.com/username/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    featured: true,
    category: "Full Stack",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tech: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express",
      "Material-UI",
    ],
    image: "/images/projects/task-management.jpg",
    github: "https://github.com/username/task-management",
    demo: "https://task-manager-demo.vercel.app",
    featured: true,
    category: "Web Application",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using weather APIs.",
    tech: [
      "React",
      "TypeScript",
      "OpenWeather API",
      "Chart.js",
      "Styled Components",
    ],
    image: "/images/projects/weather-dashboard.jpg",
    github: "https://github.com/username/weather-dashboard",
    demo: "https://weather-dashboard-demo.vercel.app",
    featured: false,
    category: "Frontend",
  },
  {
    title: "AI Chat Bot",
    description:
      "An intelligent chatbot powered by OpenAI's GPT API with conversation memory and context awareness.",
    tech: ["Python", "FastAPI", "OpenAI API", "Redis", "Docker", "React"],
    image: "/images/projects/ai-chatbot.jpg",
    github: "https://github.com/username/ai-chatbot",
    demo: "https://ai-chatbot-demo.vercel.app",
    featured: false,
    category: "AI/ML",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js, featuring smooth animations and optimized performance.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    image: "/images/projects/portfolio.jpg",
    github: "https://github.com/username/portfolio",
    demo: "https://portfolio-demo.vercel.app",
    featured: false,
    category: "Frontend",
  },
];

// Validate projects data
const validateProjectsData = (): void => {
  const errors: string[] = [];

  projectsData.forEach((project, index) => {
    const error = validateProject(project);
    if (error) {
      errors.push(`Project ${index + 1} (${project.title}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Project data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateProjectsData();
}

// Helper functions for filtering and sorting projects
export const getFeaturedProjects = (): Project[] => {
  return projectsData.filter((project) => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projectsData.filter((project) => project.category === category);
};

export const getProjectCategories = (): string[] => {
  const categories = projectsData
    .map((project) => project.category)
    .filter((category): category is string => category !== undefined);

  return Array.from(new Set(categories));
};

// Default export
export default projectsData;

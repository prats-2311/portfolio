import React from "react";
import { SkillCategory } from "@/types";
import { validateSkillCategory } from "@/lib/validation";
import {
  Code2,
  Database,
  Palette,
  Server,
  Smartphone,
  Cloud,
  Brain,
  Wrench,
} from "lucide-react";

// Skills data based on Prateek Srivastava's comprehensive project portfolio
export const skillsData: SkillCategory[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Programming Languages",
    description:
      "Proficient in multiple programming languages for Software development, AI, and system programming.",
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "C/C++",
      "HTML5",
      "CSS3",
      "Shell Scripting",
    ],
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Frontend Development",
    description:
      "Building modern, responsive, and interactive user interfaces with cutting-edge technologies.",
    skills: [
      "React.js",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Framer Motion",
      "Electron",
      "React Native",
      "Canvas API",
      "Adobe Express SDK",
    ],
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Backend & APIs",
    description:
      "Developing scalable backend systems, APIs, and server-side applications.",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "RESTful APIs",
      "GraphQL",
      "Supabase",
      "JWT Authentication",
      "WebSocket",
      "Real-time Systems",
    ],
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Databases & Storage",
    description:
      "Working with various database technologies for efficient data management and storage.",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "TiDB",
      "SQLAlchemy",
      "Redis",
      "Supabase",
      "ORM/ODM",
    ],
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI & Machine Learning",
    description:
      "Implementing AI-powered solutions with computer vision, NLP, and machine learning algorithms.",
    skills: [
      "PyTorch",
      "TensorFlow.js",
      "OpenAI Whisper",
      "MediaPipe",
      "Computer Vision",
      "Natural Language Processing",
      "OpenCV",
      "Transformers",
      "Voice Recognition",
      "Gesture Recognition",
    ],
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud & DevOps",
    description:
      "Deploying and managing applications with modern cloud platforms and DevOps practices.",
    skills: [
      "AWS",
      "Google Cloud Platform",
      "Google Earth Engine",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Netlify",
      "Kubernetes",
    ],
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Specialized Technologies",
    description:
      "Working with specialized APIs, platforms, and advanced system integrations.",
    skills: [
      "macOS Accessibility API",
      "GUI Automation",
      "Google Maps Platform",
      "Solar API",
      "Air Quality API",
      "ElevenLabs",
      "RevenueCat",
      "Google Translation API",
      "Leaflet",
    ],
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Tools & Platforms",
    description:
      "Utilizing modern development tools and platforms for efficient workflow and collaboration.",
    skills: [
      "Git",
      "Postman",
      "Jest",
      "Webpack",
      "EmailJS",
      "Chart.js",
      "Turf.js",
      "PyAutoGUI",
      "Axios",
      "bcryptjs",
    ],
  },
];

// Validate skills data
const validateSkillsData = (): void => {
  const errors: string[] = [];

  skillsData.forEach((skill, index) => {
    const error = validateSkillCategory(skill);
    if (error) {
      errors.push(`Skill ${index + 1} (${skill.title}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Skills data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateSkillsData();
}

// Helper functions for skills data
export const getSkillsByTitle = (title: string): SkillCategory | undefined => {
  return skillsData.find((skill) =>
    skill.title.toLowerCase().includes(title.toLowerCase())
  );
};

export const getAllSkillNames = (): string[] => {
  return skillsData.flatMap((category) => category.skills);
};

export const getSkillCategoriesCount = (): number => {
  return skillsData.length;
};

export const getTotalSkillsCount = (): number => {
  return skillsData.reduce(
    (total, category) => total + category.skills.length,
    0
  );
};

// Default export
export default skillsData;

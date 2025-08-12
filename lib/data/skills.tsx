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

// Sample skills data - replace with actual skills
export const skillsData: SkillCategory[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces with modern frameworks and libraries.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Vue.js",
    ],
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Backend Development",
    description:
      "Creating robust server-side applications and APIs with various technologies and frameworks.",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Database & Storage",
    description:
      "Designing and managing databases, data modeling, and implementing efficient storage solutions.",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "Supabase",
      "Firebase",
      "MySQL",
      "SQLite",
      "Database Design",
      "Data Modeling",
    ],
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud & DevOps",
    description:
      "Deploying and managing applications in cloud environments with modern DevOps practices.",
    skills: [
      "AWS",
      "Vercel",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Nginx",
      "Linux",
      "Monitoring",
      "Infrastructure as Code",
    ],
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications with native performance and user experience.",
    skills: [
      "React Native",
      "Expo",
      "Flutter",
      "iOS Development",
      "Android Development",
      "Mobile UI/UX",
      "App Store Deployment",
      "Push Notifications",
      "Offline Storage",
      "Performance Optimization",
    ],
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI & Machine Learning",
    description:
      "Implementing intelligent solutions using machine learning algorithms and AI technologies.",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "OpenAI API",
      "Natural Language Processing",
      "Computer Vision",
      "Data Analysis",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces with focus on user experience.",
    skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Prototyping",
      "User Research",
      "Wireframing",
      "Design Systems",
      "Accessibility",
      "Responsive Design",
      "Animation",
    ],
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Tools & Workflow",
    description:
      "Utilizing modern development tools and maintaining efficient workflows for productivity.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier",
      "Jest",
      "Testing Library",
      "Postman",
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

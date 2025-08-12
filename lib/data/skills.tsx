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

// Skills data based on Prateek Srivastava's resume
export const skillsData: SkillCategory[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Programming Languages",
    description:
      "Proficient in multiple programming languages for full-stack development and scripting.",
    skills: [
      "C",
      "Shell Scripting",
      "TypeScript",
      "JavaScript (Node.js)",
      "Python",
    ],
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Databases",
    description:
      "Experience with various database technologies for data storage and management.",
    skills: [
      "MongoDB",
      "MySQL",
      "RDBMS",
      "ORM and ODM",
    ],
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Frameworks and Libraries",
    description:
      "Building applications with modern frameworks and libraries for efficient development.",
    skills: [
      "Angular",
      "Mongoose",
      "REST API",
      "Django",
      "Express",
      "Bootstrap",
      "React",
      "Next.js",
      "Supabase",
    ],
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Technology & DevOps",
    description:
      "Working with modern development tools, version control, and deployment technologies.",
    skills: [
      "Git",
      "CI/CD",
      "Virtualization",
      "AWS-EC2",
      "Docker/Kubernetes",
    ],
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Operating Systems",
    description:
      "Cross-platform development experience across different operating systems.",
    skills: [
      "Linux",
      "Macintosh",
      "Windows",
    ],
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Research & AI",
    description:
      "Research experience in artificial intelligence and algorithm optimization.",
    skills: [
      "Artificial Bee Colony Algorithm",
      "Graph Algorithms",
      "C/C++ Programming",
      "Research & Development",
      "Algorithm Optimization",
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

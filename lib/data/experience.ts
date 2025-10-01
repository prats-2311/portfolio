import { Experience } from "@/types";
import { validateExperience } from "@/lib/validation";

// Work experience data based on Prateek Srivastava's resume - 3+ years of experience
export const experienceData: Experience[] = [
  {
    company: "Amino Technology Limited",
    role: "Software Developer",
    period: "Jan 2023 - Present",
    location: "Delhi, India",
    description: [
      "Developed reusable Angular components reducing development time by 40% and improving code maintainability across multiple projects",
      "Built Payment Gateway infrastructure handling 1000+ daily transactions with 99.9% uptime and secure data processing",
      "Designed company website using Next.js, improving page load speed by 60% and achieving 95+ Lighthouse performance score",
      "Created specialized APIs improving ERP software performance by 35% and reducing response time from 2s to 0.7s",
    ],
  },
  {
    company: "Sugoi Labs Pvt. Limited",
    role: "Software Developer Intern",
    period: "Jan 2021 - Jun 2021",
    location: "Bangalore, Karnataka",
    description: [
      'Developed logistics optimization project "GoodsKart" using Python, reducing manual processing time by 50%',
      "Built multiple backend modules using Python, contributing to a system serving 500+ daily users",
      "Collaborated with senior developers to implement software design patterns and maintain 95%+ code quality standards",
    ],
  },
];

// Validate experience data
const validateExperienceData = (): void => {
  const errors: string[] = [];

  experienceData.forEach((experience, index) => {
    const error = validateExperience(experience);
    if (error) {
      errors.push(`Experience ${index + 1} (${experience.company}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Experience data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateExperienceData();
}

// Helper functions for experience data
export const getCurrentExperience = (): Experience | undefined => {
  return experienceData.find(
    (exp) =>
      exp.period.toLowerCase().includes("present") ||
      exp.period.toLowerCase().includes("current")
  );
};

export const getExperienceByCompany = (
  company: string
): Experience | undefined => {
  return experienceData.find((exp) =>
    exp.company.toLowerCase().includes(company.toLowerCase())
  );
};

export const getTotalYearsOfExperience = (): number => {
  // Return 3+ years of experience (2021-2024)
  return 3;
};

export const getCompaniesWorkedAt = (): string[] => {
  return experienceData.map((exp) => exp.company);
};

export const getRolesHeld = (): string[] => {
  return experienceData.map((exp) => exp.role);
};

// Default export
export default experienceData;

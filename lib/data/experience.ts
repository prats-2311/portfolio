import { Experience } from "@/types";
import { validateExperience } from "@/lib/validation";

// Work experience data based on Prateek Srivastava's resume
export const experienceData: Experience[] = [
  {
    company: "AMLINO TECHNOLOGY LIMITED",
    role: "Software Developer",
    period: "Jan 2023 - Current",
    location: "Delhi",
    description: [
      "Work with the development team to create a reusable angular component for the dashboard",
      "Designed, developed, created Payment Gateway infrastructure for the ERP Application",
      "Developed official company website on Next.js",
      "Designed a specialized API to improve the overall performance of the ERP software, as well as the internal optimization system",
    ],
  },
  {
    company: "SUGOI LABS PVT. LIMITED",
    role: "Software Developer Intern",
    period: "Jan 2021 - Jun 2021",
    location: "Bangalore, Karnataka",
    description: [
      "Developed Project which was aimed at solving logistics for vehicles called GoodsKart",
      "As part of the Project, I worked on developing several modules using Python as a Backend Programming Language",
      "Partnered with company mentor to learn best practices in software design",
      "Handled scripting tasks for debugging and automation using Python",
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
  // Calculate based on the earliest start date to present
  const currentYear = new Date().getFullYear();
  const startYears = experienceData.map((exp) => {
    const yearMatch = exp.period.match(/(\d{4})/);
    return yearMatch ? parseInt(yearMatch[1]) : currentYear;
  });

  const earliestYear = Math.min(...startYears);
  return currentYear - earliestYear;
};

export const getCompaniesWorkedAt = (): string[] => {
  return experienceData.map((exp) => exp.company);
};

export const getRolesHeld = (): string[] => {
  return experienceData.map((exp) => exp.role);
};

// Default export
export default experienceData;

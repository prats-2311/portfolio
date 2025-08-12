import { Experience } from "@/types";
import { validateExperience } from "@/lib/validation";

// Sample experience data - replace with actual work experience
export const experienceData: Experience[] = [
  {
    company: "Tech Innovations Inc.",
    role: "Senior Full Stack Developer",
    period: "2022 - Present",
    location: "San Francisco, CA (Remote)",
    description: [
      "Led development of a microservices architecture serving 100K+ daily active users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
      "Collaborated with product team to define technical requirements",
      "Optimized application performance resulting in 40% faster load times",
    ],
  },
  {
    company: "Digital Solutions LLC",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    location: "New York, NY",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Built RESTful APIs and integrated third-party services",
      "Implemented responsive designs and improved mobile user experience",
      "Participated in agile development processes and sprint planning",
      "Reduced bug reports by 30% through comprehensive testing strategies",
    ],
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    period: "2019 - 2020",
    location: "Austin, TX",
    description: [
      "Created interactive user interfaces using React and TypeScript",
      "Collaborated with UX designers to implement pixel-perfect designs",
      "Optimized web applications for performance and accessibility",
      "Integrated analytics and tracking for user behavior analysis",
      "Contributed to the company's design system and component library",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2018 - 2019",
    location: "Remote",
    description: [
      "Delivered custom web solutions for small to medium businesses",
      "Managed complete project lifecycle from requirements to deployment",
      "Built e-commerce platforms and content management systems",
      "Provided ongoing maintenance and technical support",
      "Achieved 95% client satisfaction rate with on-time project delivery",
    ],
  },
  {
    company: "University Research Lab",
    role: "Research Assistant & Developer",
    period: "2017 - 2018",
    location: "Boston, MA",
    description: [
      "Developed data visualization tools for academic research projects",
      "Created automated scripts for data processing and analysis",
      "Collaborated with researchers to understand technical requirements",
      "Published findings in peer-reviewed academic journals",
      "Presented research at national conferences and symposiums",
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

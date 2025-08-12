import { Education } from "@/types";
import { validateEducation } from "@/lib/validation";

// Education data based on Prateek Srivastava's resume
export const educationData: Education[] = [
  {
    institution: "UNIVERSITY OF HYDERABAD",
    degree: "M.Tech in Computer Science",
    period: "Dec 2022",
    location: "Hyderabad, Telangana",
    description: [
      "Specialized in Computer Science and Engineering",
      "Completed advanced coursework in algorithms and data structures",
      "Participated in research projects and academic initiatives",
    ],
  },
  {
    institution: "PSIT KANPUR",
    degree: "B.Tech in Computer Science and Engineering",
    period: "May 2017",
    location: "Kanpur, UP",
    description: [
      "Bachelor's degree in Computer Science and Engineering",
      "Strong foundation in programming and software development",
      "Participated in various technical and academic activities",
    ],
  },
  {
    institution: "CITY MONTESSORI SCHOOL",
    degree: "High School",
    period: "May 2013",
    location: "Lucknow, India",
    description: [
      "Completed secondary education with focus on science and mathematics",
      "Participated in various academic and extracurricular activities",
    ],
  },
];

// Validate education data
const validateEducationData = (): void => {
  const errors: string[] = [];

  educationData.forEach((education, index) => {
    const error = validateEducation(education);
    if (error) {
      errors.push(`Education ${index + 1} (${education.institution}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Education data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateEducationData();
}

// Helper functions for education data
export const getLatestEducation = (): Education | undefined => {
  return educationData[0]; // Assuming the first entry is the most recent
};

export const getEducationByInstitution = (
  institution: string
): Education | undefined => {
  return educationData.find((edu) =>
    edu.institution.toLowerCase().includes(institution.toLowerCase())
  );
};

export const getEducationByDegree = (degree: string): Education | undefined => {
  return educationData.find((edu) =>
    edu.degree.toLowerCase().includes(degree.toLowerCase())
  );
};

// Default export
export default educationData;

// Validation utilities for portfolio data and forms

import {
  Project,
  SkillCategory,
  Experience,
  Education,
  BlogPost,
  Hackathon,
  ContactFormData,
  ContactFormErrors,
} from "@/types";
import { VALIDATION_RULES } from "./constants";

// Generic validation function type
type ValidationFunction<T> = (data: T) => string | null;

// Project validation
export const validateProject = (project: Partial<Project>): string | null => {
  if (!project.title?.trim()) return "Project title is required";
  if (!project.description?.trim()) return "Project description is required";
  if (!project.tech?.length) return "At least one technology is required";
  if (!project.image?.trim()) return "Project image is required";

  // Validate URLs if provided
  if (project.github && !isValidUrl(project.github)) {
    return "Invalid GitHub URL";
  }
  if (project.demo && !isValidUrl(project.demo)) {
    return "Invalid demo URL";
  }

  return null;
};

// Skill category validation
export const validateSkillCategory = (
  skill: Partial<SkillCategory>
): string | null => {
  if (!skill.title?.trim()) return "Skill title is required";
  if (!skill.description?.trim()) return "Skill description is required";
  if (!skill.skills?.length) return "At least one skill is required";
  if (!skill.icon) return "Skill icon is required";

  return null;
};

// Experience validation
export const validateExperience = (
  experience: Partial<Experience>
): string | null => {
  if (!experience.company?.trim()) return "Company name is required";
  if (!experience.role?.trim()) return "Role is required";
  if (!experience.period?.trim()) return "Period is required";
  if (!experience.location?.trim()) return "Location is required";
  if (!experience.description?.length)
    return "At least one description point is required";

  return null;
};

// Education validation
export const validateEducation = (
  education: Partial<Education>
): string | null => {
  if (!education.institution?.trim()) return "Institution name is required";
  if (!education.degree?.trim()) return "Degree is required";
  if (!education.period?.trim()) return "Period is required";
  if (!education.location?.trim()) return "Location is required";
  if (!education.description?.length)
    return "At least one description point is required";

  return null;
};

// Blog post validation
export const validateBlogPost = (blog: Partial<BlogPost>): string | null => {
  if (typeof blog.id !== "number") return "Blog ID is required and must be a number";
  if (!blog.title?.trim()) return "Blog title is required";
  if (!blog.excerpt?.trim()) return "Blog excerpt is required";
  if (!blog.content?.trim()) return "Blog content is required";
  if (!blog.date?.trim()) return "Blog date is required";
  if (!blog.readTime?.trim()) return "Read time is required";
  if (!blog.tags?.length) return "At least one tag is required";
  if (!blog.image?.trim()) return "Blog image is required";

  return null;
};

// Hackathon validation
export const validateHackathon = (
  hackathon: Partial<Hackathon>
): string | null => {
  if (!hackathon.name?.trim()) return "Hackathon name is required";
  if (!hackathon.project?.trim()) return "Project name is required";
  if (!hackathon.description?.trim()) return "Project description is required";
  if (!hackathon.position?.trim()) return "Position is required";
  if (!hackathon.date?.trim()) return "Date is required";
  if (!hackathon.tech?.length) return "At least one technology is required";
  if (!hackathon.image?.trim()) return "Project image is required";

  // Validate URLs if provided
  if (hackathon.github && !isValidUrl(hackathon.github)) {
    return "Invalid GitHub URL";
  }
  if (hackathon.demo && !isValidUrl(hackathon.demo)) {
    return "Invalid demo URL";
  }

  return null;
};

// Contact form validation
export const validateContactForm = (
  data: Partial<ContactFormData>
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!data.name?.trim()) {
    errors.name = "Name is required";
  } else if (data.name.length < VALIDATION_RULES.minNameLength) {
    errors.name = `Name must be at least ${VALIDATION_RULES.minNameLength} characters`;
  } else if (data.name.length > VALIDATION_RULES.maxNameLength) {
    errors.name = `Name must be less than ${VALIDATION_RULES.maxNameLength} characters`;
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!VALIDATION_RULES.email.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Subject validation
  if (!data.subject?.trim()) {
    errors.subject = "Subject is required";
  }

  // Message validation
  if (!data.message?.trim()) {
    errors.message = "Message is required";
  } else if (data.message.length < VALIDATION_RULES.minMessageLength) {
    errors.message = `Message must be at least ${VALIDATION_RULES.minMessageLength} characters`;
  } else if (data.message.length > VALIDATION_RULES.maxMessageLength) {
    errors.message = `Message must be less than ${VALIDATION_RULES.maxMessageLength} characters`;
  }

  return errors;
};

// URL validation utility
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Email validation utility
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_RULES.email.test(email);
};

// Generic array validation
export const validateArray = <T>(
  array: T[],
  validator: ValidationFunction<T>,
  fieldName: string
): string[] => {
  const errors: string[] = [];

  array.forEach((item, index) => {
    const error = validator(item);
    if (error) {
      errors.push(`${fieldName} ${index + 1}: ${error}`);
    }
  });

  return errors;
};

// Validate all portfolio data
export const validatePortfolioData = (data: {
  projects?: Project[];
  skills?: SkillCategory[];
  experiences?: Experience[];
  blogs?: BlogPost[];
  hackathons?: Hackathon[];
}): string[] => {
  const errors: string[] = [];

  if (data.projects) {
    errors.push(...validateArray(data.projects, validateProject, "Project"));
  }

  if (data.skills) {
    errors.push(...validateArray(data.skills, validateSkillCategory, "Skill"));
  }

  if (data.experiences) {
    errors.push(
      ...validateArray(data.experiences, validateExperience, "Experience")
    );
  }

  if (data.blogs) {
    errors.push(...validateArray(data.blogs, validateBlogPost, "Blog"));
  }

  if (data.hackathons) {
    errors.push(
      ...validateArray(data.hackathons, validateHackathon, "Hackathon")
    );
  }

  return errors;
};

// Form field validation helpers
export const createFieldValidator = <T>(rules: ValidationFunction<T>[]) => {
  return (value: T): string | null => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };
};

// Common validation rules
export const validationRules = {
  required: <T>(value: T): string | null => {
    if (value === null || value === undefined || value === "") {
      return "This field is required";
    }
    return null;
  },

  minLength:
    (min: number) =>
    (value: string): string | null => {
      if (value.length < min) {
        return `Must be at least ${min} characters`;
      }
      return null;
    },

  maxLength:
    (max: number) =>
    (value: string): string | null => {
      if (value.length > max) {
        return `Must be less than ${max} characters`;
      }
      return null;
    },

  email: (value: string): string | null => {
    if (!isValidEmail(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },

  url: (value: string): string | null => {
    if (!isValidUrl(value)) {
      return "Please enter a valid URL";
    }
    return null;
  },
};

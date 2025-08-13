// Main library exports for easy importing

// Utility functions
export * from "./utils";
export * from "./validation";
export * from "./constants";

// Re-export specific utilities for convenience
export {
  cn,
  withDefaults,
  safeArray,
  safeString,
  safeNumber,
  safeBoolean,
  formatDate,
  formatRelativeDate,
  truncateText,
  generateSlug,
  debounce,
  throttle,
  storage,
  arrayUtils,
  urlUtils,
  handleError,
  getImagePath,
  formatTechTags,
  calculateReadingTime,
  smoothScrollTo,
  copyToClipboard,
  downloadFile,
  formatFileSize,
  getDeviceType,
  isMobile,
  isTablet,
  isDesktop,
} from "./utils";

// Data exports
import projectsDataImport, {
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectCategories,
} from "./data/projects";
export {
  projectsDataImport as projectsData,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectCategories,
};
import skillsDataImport, {
  getSkillsByTitle,
  getAllSkillNames,
  getSkillCategoriesCount,
  getTotalSkillsCount,
} from "./data/skills";
export {
  skillsDataImport as skillsData,
  getSkillsByTitle,
  getAllSkillNames,
  getSkillCategoriesCount,
  getTotalSkillsCount,
};
import experienceDataImport, {
  getCurrentExperience,
  getExperienceByCompany,
  getTotalYearsOfExperience,
  getCompaniesWorkedAt,
  getRolesHeld,
} from "./data/experience";
export {
  experienceDataImport as experienceData,
  getCurrentExperience,
  getExperienceByCompany,
  getTotalYearsOfExperience,
  getCompaniesWorkedAt,
  getRolesHeld,
};





// Portfolio data collection


// Data statistics
export const getPortfolioStats = () => {
  return {
    totalProjects: projectsDataImport.length,
    featuredProjects: getFeaturedProjects().length,
    totalSkills: getTotalSkillsCount(),
    skillCategories: getSkillCategoriesCount(),
    yearsOfExperience: getTotalYearsOfExperience(),
  };
};

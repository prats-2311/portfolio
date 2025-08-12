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
import blogsDataImport, {
  getBlogsByTag,
  getRecentBlogs,
  getAllTags,
  getBlogsByYear,
  getTotalReadTime,
  searchBlogs,
} from "./data/blogs";
export {
  blogsDataImport as blogsData,
  getBlogsByTag,
  getRecentBlogs,
  getAllTags,
  getBlogsByYear,
  getTotalReadTime,
  searchBlogs,
};
import hackathonsDataImport, {
  getWinningHackathons,
  getHackathonsByYear,
  getHackathonsByTech,
  getRecentHackathons,
  getAllHackathonTechs,
  getHackathonStats,
  searchHackathons,
} from "./data/hackathons";
export {
  hackathonsDataImport as hackathonsData,
  getWinningHackathons,
  getHackathonsByYear,
  getHackathonsByTech,
  getRecentHackathons,
  getAllHackathonTechs,
  getHackathonStats,
  searchHackathons,
};

// Portfolio data collection
export const portfolioData = {
  projects: projectsDataImport,
  skills: skillsDataImport,
  experience: experienceDataImport,
  blogs: blogsDataImport,
  hackathons: hackathonsDataImport,
};

// Data statistics
export const getPortfolioStats = () => {
  return {
    totalProjects: projectsDataImport.length,
    featuredProjects: getFeaturedProjects().length,
    totalSkills: getTotalSkillsCount(),
    skillCategories: getSkillCategoriesCount(),
    yearsOfExperience: getTotalYearsOfExperience(),
    totalBlogs: blogsDataImport.length,
    totalReadTime: getTotalReadTime(),
    totalHackathons: hackathonsDataImport.length,
    hackathonWins: getWinningHackathons().length,
  };
};

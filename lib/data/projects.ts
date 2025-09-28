import { Project } from "@/types";
import { validateProject } from "@/lib/validation";

// Projects data based on Prateek Srivastava's detailed project documentation
export const projectsData: Project[] = [
  {
    title: "YELPCAMP",
    description:
      "Designed and developed a full stack web app using MERN Stack i.e. MongoDB, Express, React and Node.js for front-end and back-end of the application, deployed through GitHub using content render. The purpose of the project was to create a community of users to rate and leave reviews of campsites and hidden places for your adventures.",
    tech: ["MongoDB", "Express", "React", "Node.js", "MERN Stack", "GitHub"],
    image: "/yelcamp.png",
    github: "https://github.com/prats-2311",
    demo: "https://yelpcamp-zoc9.onrender.com/",
    featured: true,
    category: "Web Development",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual demo video
  },
  {
    title: "cseCatalyst: AI-Powered UPSC Preparation Platform",
    description:
      "Revolutionary AI-powered daily study partner for India's 2M+ competitive exam aspirants. Features comprehensive current affairs analysis using Past-Present-Future framework, multi-source synthesis from newspapers and government sources, interactive learning tools with quizzes and flashcards, accessibility features including multi-language support and audio summaries, community forums for peer learning, and Pro subscription model with advanced features. Built with modern full-stack architecture using React, Node.js, Supabase, and integrated with Google Cloud Translation API and ElevenLabs for enhanced user experience.",
    tech: [
      "React",
      "Node.js",
      "Supabase",
      "Express.js",
      "PostgreSQL",
      "Google Cloud Translation API",
      "ElevenLabs",
      "RevenueCat",
      "Netlify",
      "Tailwind CSS",
      "JWT Authentication",
      "Edge Functions",
    ],
    image: "/csecatalyst.png",
    github: "https://github.com/prats-2311",
    demo: "https://csecatalyst.me/",
    featured: true,
    category: "Education",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual demo video
  },
  {
    title: "Global Climate Visualization Platform",
    description:
      "Comprehensive climate visualization platform providing global coverage for any location worldwide. Features 40+ years of historical climate data visualization (1980-Present), AI-powered future predictions through 2050 using TensorFlow.js, real-time environmental health monitoring with Air Quality Index, solar potential mapping using Google's Solar API, and immersive 3D visualization with cinematic fly-through experiences. Built with adaptive algorithms that automatically adjust to different regional characteristics and climate patterns, supporting universal geographic coverage with intelligent location search and processing.",
    tech: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Google Earth Engine",
      "TensorFlow.js",
      "Google Maps Platform",
      "Google Cloud",
      "Air Quality API",
      "Solar API",
      "Aerial View API",
      "ECMWF ERA5 Land",
      "Landsat Collection",
      "MODIS Terra/Aqua",
      "Turf.js",
      "CSS3",
      "HTML5",
    ],
    image: "/google_Earth.png",
    github: "https://github.com/prats-2311",
    demo: "https://google-maps-earth.onrender.com/fallback.html",
    featured: true,
    category: "Environmental Tech",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual demo video
  },
  {
    title: "Blood Warriors: Life-Saving Blood Donation Platform",
    description:
      "Comprehensive digital platform connecting blood donors with patients through intelligent matching based on blood type, location, and urgency. Features real-time blood requests from hospitals, AI-powered CareBot for medical guidance, gamified donation experience with rewards and achievements, emergency SOS requests for critical situations, detailed donor and patient profiles with medical history, and location-based services to find nearby blood banks. Built with modern full-stack architecture ensuring HIPAA-compliant data handling, real-time communication, and mobile-responsive design for accessibility across all devices.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "Supabase",
      "CSS3",
      "Leaflet",
      "Axios",
      "JWT",
      "bcryptjs",
      "WebSocket",
      "Geolocation API",
    ],
    image: "/blood_warriors.png",
    github: "https://github.com/prats-2311/blood_warriors.git",
    demo: "http://bloodwarriors.netlify.app",
    featured: true,
    category: "Healthcare",
  },
  {
    title: "EDNCP using Artificial Bee Colony Algorithm",
    description:
      "Research project in collaboration with Dr. Alok Singh to design, develop and analyze a polynomial time metaheuristic Artificial Bee Colony Algorithm to solve Electricity Distribution Network Configuration Problem optimally using graph algorithms in C/C++ programming language, achieving 93% reduction in time complexity through advanced algorithm optimization techniques.",
    tech: [
      "C/C++",
      "Artificial Bee Colony Algorithm",
      "Graph Algorithms",
      "Algorithm Optimization",
      "Research",
      "Metaheuristic Algorithms",
    ],
    image: "/edncp.jpg",
    github: "https://github.com/prats-2311",
    demo: "",
    featured: true,
    category: "Research",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website built with Next.js, featuring dark mode, smooth animations, responsive design, and comprehensive project showcase.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/portfolio.png",
    github: "https://github.com/prats-2311",
    demo: "https://prats2311.tech",
    featured: false,
    category: "Web Development",
  },
];

// Validate projects data
const validateProjectsData = (): void => {
  const errors: string[] = [];

  projectsData.forEach((project, index) => {
    const error = validateProject(project);
    if (error) {
      errors.push(`Project ${index + 1} (${project.title}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Project data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateProjectsData();
}

// Helper functions for filtering and sorting projects
export const getFeaturedProjects = (): Project[] => {
  return projectsData.filter((project) => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projectsData.filter((project) => project.category === category);
};

export const getProjectCategories = (): string[] => {
  const categories = projectsData
    .map((project) => project.category)
    .filter((category): category is string => category !== undefined);

  return Array.from(new Set(categories));
};

// Default export
export default projectsData;

import { BlogPost } from "@/types";
import { validateBlogPost } from "@/lib/validation";

// Technical blog posts based on Prateek Srivastava's expertise and projects
export const blogsData: BlogPost[] = [
  {
    title: "Building AI-Powered Educational Platforms: Lessons from cseCatalyst",
    excerpt:
      "Deep dive into creating scalable educational technology platforms with AI integration. Learn about implementing multi-language support, real-time content processing, and building community features for millions of users. Covers architecture decisions, database design with Supabase, and integrating Google Cloud APIs for translation and text-to-speech.",
    date: "2024-01-15",
    readTime: "12 min read",
    tags: ["React", "AI", "Education Tech", "Supabase", "Google Cloud"],
    image: "/images/blogs/ai-educational-platforms.jpg",
    link: "https://medium.com/@prateek.srivastava2311/building-ai-powered-educational-platforms",
  },
  {
    title: "Implementing Real-Time Climate Visualization with Google Earth Engine",
    excerpt:
      "Comprehensive guide to building global climate visualization platforms using Google Earth Engine, TensorFlow.js for predictive modeling, and creating adaptive algorithms that work across different climate zones. Includes performance optimization techniques for processing 40+ years of worldwide climate data in real-time.",
    date: "2024-01-08",
    readTime: "15 min read",
    tags: ["Google Earth Engine", "TensorFlow.js", "Climate Data", "Visualization", "JavaScript"],
    image: "/images/blogs/climate-visualization.jpg",
    link: "https://dev.to/prateek2311/implementing-real-time-climate-visualization",
  },
  {
    title: "Healthcare Technology: Building HIPAA-Compliant Blood Donation Platforms",
    excerpt:
      "Learn how to develop secure healthcare applications with real-time donor-patient matching, geolocation services, and AI-powered medical guidance. Covers implementing WebSocket communication, ensuring data privacy compliance, and creating gamified user experiences for critical healthcare applications.",
    date: "2023-12-22",
    readTime: "11 min read",
    tags: ["Healthcare Tech", "React", "WebSocket", "Geolocation", "Security"],
    image: "/images/blogs/healthcare-platforms.jpg",
    link: "https://hashnode.com/@prateek2311/healthcare-technology-blood-donation-platforms",
  },
  {
    title: "Optimizing Graph Algorithms: Artificial Bee Colony for Network Problems",
    excerpt:
      "Research-based exploration of metaheuristic algorithms for solving complex network optimization problems. Deep dive into implementing Artificial Bee Colony Algorithm in C/C++, achieving 93% time complexity reduction, and practical applications in electricity distribution networks.",
    date: "2023-12-10",
    readTime: "18 min read",
    tags: ["Algorithms", "C++", "Graph Theory", "Optimization", "Research"],
    image: "/images/blogs/graph-algorithms.jpg",
    link: "https://towardsdatascience.com/@prateek2311/optimizing-graph-algorithms-abc",
  },
  {
    title: "Full-Stack Development with MERN Stack: From Concept to Deployment",
    excerpt:
      "Complete guide to building production-ready applications using MongoDB, Express.js, React, and Node.js. Covers project architecture, authentication implementation, database design, and deployment strategies. Includes real-world examples from YelpCamp project development.",
    date: "2023-11-28",
    readTime: "16 min read",
    tags: ["MERN Stack", "MongoDB", "Express", "React", "Node.js"],
    image: "/images/blogs/mern-stack-guide.jpg",
    link: "https://blog.prateek2311.com/mern-stack-development-guide",
  },
  {
    title: "Supabase vs Traditional Backend: Modern Database Solutions",
    excerpt:
      "Comprehensive comparison of Supabase with traditional backend solutions. Learn about Row Level Security, Edge Functions, real-time subscriptions, and when to choose Supabase for your next project. Includes migration strategies and performance considerations.",
    date: "2023-11-15",
    readTime: "13 min read",
    tags: ["Supabase", "PostgreSQL", "Backend", "Database", "Real-time"],
    image: "/images/blogs/supabase-guide.jpg",
    link: "https://medium.com/@prateek.srivastava2311/supabase-vs-traditional-backend",
  },
  {
    title: "Building Scalable Community Platforms: Forums and User Engagement",
    excerpt:
      "Learn how to create engaging community features with discussion forums, user roles, content moderation, and gamification. Covers implementing threaded conversations, notification systems, and building sustainable community ecosystems for educational platforms.",
    date: "2023-10-30",
    readTime: "14 min read",
    tags: ["Community Building", "Forums", "User Engagement", "Gamification"],
    image: "/images/blogs/community-platforms.jpg",
    link: "https://dev.to/prateek2311/building-scalable-community-platforms",
  },
  {
    title: "Modern Web Development: TypeScript, Tailwind CSS, and Performance",
    excerpt:
      "Best practices for modern web development using TypeScript for type safety, Tailwind CSS for rapid styling, and performance optimization techniques. Includes code splitting, lazy loading, and creating responsive designs that work across all devices.",
    date: "2023-10-12",
    readTime: "10 min read",
    tags: ["TypeScript", "Tailwind CSS", "Performance", "Web Development"],
    image: "/images/blogs/modern-web-dev.jpg",
    link: "https://css-tricks.com/author/prateek2311/modern-web-development",
  },
];

// Validate blogs data
const validateBlogsData = (): void => {
  const errors: string[] = [];

  blogsData.forEach((blog, index) => {
    const error = validateBlogPost(blog);
    if (error) {
      errors.push(`Blog ${index + 1} (${blog.title}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Blogs data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateBlogsData();
}

// Helper functions for blog data
export const getBlogsByTag = (tag: string): BlogPost[] => {
  return blogsData.filter((blog) =>
    blog.tags.some((blogTag) =>
      blogTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export const getRecentBlogs = (count: number = 5): BlogPost[] => {
  return blogsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getAllTags = (): string[] => {
  const allTags = blogsData.flatMap((blog) => blog.tags);
  return Array.from(new Set(allTags));
};

export const getBlogsByYear = (year: number): BlogPost[] => {
  return blogsData.filter((blog) => new Date(blog.date).getFullYear() === year);
};

export const getTotalReadTime = (): number => {
  return blogsData.reduce((total, blog) => {
    const minutes = parseInt(blog.readTime.match(/\d+/)?.[0] || "0");
    return total + minutes;
  }, 0);
};

export const searchBlogs = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return blogsData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
};

// Default export
export default blogsData;

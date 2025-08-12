import { BlogPost } from "@/types";
import { validateBlogPost } from "@/lib/validation";

// Sample blog posts data - replace with actual blog posts
export const blogsData: BlogPost[] = [
  {
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, best practices for component architecture, and strategies for maintaining code quality as your project grows.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture", "Best Practices"],
    image: "/images/blogs/react-typescript.jpg",
    link: "https://medium.com/@username/building-scalable-react-applications",
  },
  {
    title: "The Complete Guide to Next.js App Router",
    excerpt:
      "Explore the new App Router in Next.js 13+, including server components, streaming, and how to migrate from the Pages Router. Complete with practical examples and performance tips.",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["Next.js", "React", "Server Components", "Performance"],
    image: "/images/blogs/nextjs-app-router.jpg",
    link: "https://dev.to/username/complete-guide-nextjs-app-router",
  },
  {
    title: "Mastering CSS Grid and Flexbox for Modern Layouts",
    excerpt:
      "A comprehensive guide to creating responsive layouts using CSS Grid and Flexbox. Learn when to use each approach and how to combine them effectively.",
    date: "2023-12-22",
    readTime: "10 min read",
    tags: ["CSS", "Grid", "Flexbox", "Responsive Design"],
    image: "/images/blogs/css-grid-flexbox.jpg",
    link: "https://css-tricks.com/author/username/mastering-css-layouts",
  },
  {
    title: "Database Design Patterns for Modern Web Applications",
    excerpt:
      "Explore common database design patterns, normalization strategies, and how to choose the right database for your application. Includes examples with PostgreSQL and MongoDB.",
    date: "2023-12-10",
    readTime: "15 min read",
    tags: ["Database", "PostgreSQL", "MongoDB", "Design Patterns"],
    image: "/images/blogs/database-design.jpg",
    link: "https://hashnode.com/@username/database-design-patterns",
  },
  {
    title: "Implementing Authentication in Next.js with NextAuth.js",
    excerpt:
      "Step-by-step guide to implementing secure authentication in Next.js applications using NextAuth.js. Covers OAuth providers, JWT tokens, and session management.",
    date: "2023-11-28",
    readTime: "11 min read",
    tags: ["Next.js", "Authentication", "Security", "NextAuth.js"],
    image: "/images/blogs/nextjs-auth.jpg",
    link: "https://blog.username.com/nextjs-authentication-guide",
  },
  {
    title: "Optimizing React Performance: A Developer's Guide",
    excerpt:
      "Learn advanced techniques for optimizing React application performance, including memoization, code splitting, lazy loading, and profiling tools.",
    date: "2023-11-15",
    readTime: "9 min read",
    tags: ["React", "Performance", "Optimization", "Profiling"],
    image: "/images/blogs/react-performance.jpg",
    link: "https://medium.com/@username/optimizing-react-performance",
  },
  {
    title: "Building RESTful APIs with Node.js and Express",
    excerpt:
      "Complete tutorial on creating robust RESTful APIs using Node.js and Express. Covers middleware, error handling, validation, and API documentation.",
    date: "2023-10-30",
    readTime: "13 min read",
    tags: ["Node.js", "Express", "API", "Backend"],
    image: "/images/blogs/nodejs-express-api.jpg",
    link: "https://dev.to/username/building-restful-apis-nodejs-express",
  },
  {
    title: "Introduction to Machine Learning with Python",
    excerpt:
      "Get started with machine learning using Python. Learn about data preprocessing, model training, and evaluation using popular libraries like scikit-learn and pandas.",
    date: "2023-10-12",
    readTime: "14 min read",
    tags: ["Python", "Machine Learning", "Data Science", "AI"],
    image: "/images/blogs/ml-python.jpg",
    link: "https://towardsdatascience.com/@username/intro-ml-python",
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

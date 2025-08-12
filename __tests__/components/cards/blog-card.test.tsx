import React from "react";
import { render, screen } from "@testing-library/react";
import { BlogCard } from "@/components/cards/blog-card";
import { BlogCardProps } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    article: ({ children, ...props }: any) => (
      <article {...props}>{children}</article>
    ),
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

const mockBlog: BlogCardProps = {
  title: "Building Scalable React Applications",
  excerpt:
    "Learn how to structure large React applications using TypeScript and modern patterns for maintainable code.",
  date: "Dec 15, 2023",
  readTime: "8 min read",
  tags: ["React", "TypeScript", "Architecture"],
  image: "/blog-image.jpg",
  link: "https://blog.example.com/scalable-react",
};

describe("BlogCard", () => {
  it("renders blog information correctly", () => {
    render(<BlogCard {...mockBlog} />);

    expect(
      screen.getByText("Building Scalable React Applications")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Learn how to structure large React applications/)
    ).toBeInTheDocument();
    expect(screen.getByText("Dec 15, 2023")).toBeInTheDocument();
    expect(screen.getByText("8 min read")).toBeInTheDocument();
  });

  it("renders blog image with correct alt text", () => {
    render(<BlogCard {...mockBlog} />);

    const image = screen.getByAltText("Building Scalable React Applications");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/blog-image.jpg");
  });

  it("renders all tags", () => {
    render(<BlogCard {...mockBlog} />);

    mockBlog.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("renders read more link with correct attributes", () => {
    render(<BlogCard {...mockBlog} />);

    const readMoreLink = screen.getByRole("link", { name: /read more/i });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute(
      "href",
      "https://blog.example.com/scalable-react"
    );
    expect(readMoreLink).toHaveAttribute("target", "_blank");
    expect(readMoreLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays calendar and clock icons", () => {
    render(<BlogCard {...mockBlog} />);

    // Check for date and read time elements
    const dateElement = screen.getByText("Dec 15, 2023").closest("span");
    const readTimeElement = screen.getByText("8 min read").closest("span");

    expect(dateElement).toBeInTheDocument();
    expect(readTimeElement).toBeInTheDocument();
  });

  it("handles empty tags array", () => {
    const blogWithoutTags = { ...mockBlog, tags: [] };
    render(<BlogCard {...blogWithoutTags} />);

    expect(
      screen.getByText("Building Scalable React Applications")
    ).toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });

  it("handles long titles correctly", () => {
    const blogWithLongTitle = {
      ...mockBlog,
      title:
        "This is a Very Long Blog Title That Should Be Truncated Properly When Displayed in the Card Component",
    };

    render(<BlogCard {...blogWithLongTitle} />);

    expect(
      screen.getByText(/This is a Very Long Blog Title/)
    ).toBeInTheDocument();
  });

  it("handles long excerpts correctly", () => {
    const blogWithLongExcerpt = {
      ...mockBlog,
      excerpt:
        "This is a very long excerpt that should be truncated properly when displayed in the blog card component. It contains multiple sentences and should demonstrate how the component handles overflow text gracefully.",
    };

    render(<BlogCard {...blogWithLongExcerpt} />);

    expect(screen.getByText(/This is a very long excerpt/)).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<BlogCard {...mockBlog} />);

    const article = container.firstChild as HTMLElement;
    expect(article).toHaveClass(
      "group",
      "overflow-hidden",
      "rounded-xl",
      "border"
    );
  });

  it("renders multiple blog cards without conflicts", () => {
    const blog1 = { ...mockBlog, title: "First Blog Post" };
    const blog2 = {
      ...mockBlog,
      title: "Second Blog Post",
      tags: ["Vue.js", "JavaScript"],
      link: "https://blog.example.com/second-post",
    };

    render(
      <div>
        <BlogCard {...blog1} />
        <BlogCard {...blog2} />
      </div>
    );

    expect(screen.getByText("First Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Second Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Vue.js")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();

    const links = screen.getAllByRole("link", { name: /read more/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://blog.example.com/scalable-react"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://blog.example.com/second-post"
    );
  });

  it("handles different date formats", () => {
    const blogWithDifferentDate = {
      ...mockBlog,
      date: "January 1, 2024",
    };

    render(<BlogCard {...blogWithDifferentDate} />);

    expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
  });

  it("handles different read time formats", () => {
    const blogWithDifferentReadTime = {
      ...mockBlog,
      readTime: "15 minutes",
    };

    render(<BlogCard {...blogWithDifferentReadTime} />);

    expect(screen.getByText("15 minutes")).toBeInTheDocument();
  });

  it("handles special characters in content", () => {
    const blogWithSpecialChars = {
      ...mockBlog,
      title: "React & TypeScript: A Perfect Match!",
      excerpt: "Discover how React + TypeScript = ❤️ for developers",
      tags: ["React.js", "TypeScript 5.0", "Web Dev"],
    };

    render(<BlogCard {...blogWithSpecialChars} />);

    expect(
      screen.getByText("React & TypeScript: A Perfect Match!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Discover how React + TypeScript = ❤️ for developers")
    ).toBeInTheDocument();
    expect(screen.getByText("TypeScript 5.0")).toBeInTheDocument();
  });
});

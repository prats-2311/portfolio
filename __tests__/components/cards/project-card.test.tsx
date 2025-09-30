import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/cards/project-card";
import { ProjectCardProps } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockProject: ProjectCardProps = {
  title: "Test Project",
  description: "This is a test project description",
  tech: ["React", "TypeScript", "Jest"],
  image: "/test-image.jpg",
  github: "https://github.com/test/project",
  demo: "https://demo.test.com",
  featured: false,
};

describe("ProjectCard", () => {
  it("renders project information correctly", () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test project description")
    ).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Jest")).toBeInTheDocument();
  });

  it("renders project image with correct alt text", () => {
    render(<ProjectCard {...mockProject} />);

    const image = screen.getByAltText("Test Project");
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so we check if it contains our image path (URL encoded)
    expect(image.getAttribute("src")).toContain("%2Ftest-image.jpg");
  });

  it("renders GitHub and demo links when provided", () => {
    render(<ProjectCard {...mockProject} />);

    const githubLink = screen.getByRole("link", { name: /code/i });
    const demoLink = screen.getByRole("link", { name: /demo/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/test/project"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute("href", "https://demo.test.com");
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render links when not provided", () => {
    const projectWithoutLinks = {
      ...mockProject,
      github: undefined,
      demo: undefined,
    };

    render(<ProjectCard {...projectWithoutLinks} />);

    expect(
      screen.queryByRole("link", { name: /code/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /demo/i })
    ).not.toBeInTheDocument();
  });

  it("applies featured styling when featured is true", () => {
    const featuredProject = { ...mockProject, featured: true };
    const { container } = render(<ProjectCard {...featuredProject} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("md:col-span-2", "md:row-span-2");

    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("does not show featured badge when featured is false", () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });

  it("renders all technology tags", () => {
    render(<ProjectCard {...mockProject} />);

    mockProject.tech.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("handles missing optional props gracefully", () => {
    const minimalProject: ProjectCardProps = {
      title: "Minimal Project",
      description: "Minimal description",
      tech: ["React"],
      image: "/minimal.jpg",
    };

    render(<ProjectCard {...minimalProject} />);

    expect(screen.getByText("Minimal Project")).toBeInTheDocument();
    expect(screen.getByText("Minimal description")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

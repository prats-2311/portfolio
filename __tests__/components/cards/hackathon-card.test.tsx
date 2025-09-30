import React from "react";
import { render, screen } from "@testing-library/react";
import { HackathonCard } from "@/components/cards/hackathon-card";
import { HackathonCardProps } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

const mockHackathon: HackathonCardProps = {
  name: "TechCrunch Disrupt 2023",
  project: "EcoTrack",
  description:
    "AI-powered carbon footprint tracking app that helps users reduce their environmental impact through personalized recommendations.",
  position: "1st Place",
  date: "Oct 2023",
  tech: ["React Native", "Python", "TensorFlow", "Firebase"],
  image: "/hackathon-image.jpg",
  github: "https://github.com/user/ecotrack",
  demo: "https://ecotrack-demo.com",
};

describe("HackathonCard", () => {
  it("renders hackathon information correctly", () => {
    render(<HackathonCard {...mockHackathon} />);

    expect(screen.getByText("EcoTrack")).toBeInTheDocument();
    expect(screen.getByText("TechCrunch Disrupt 2023")).toBeInTheDocument();
    expect(
      screen.getByText(/AI-powered carbon footprint tracking app/)
    ).toBeInTheDocument();
    expect(screen.getByText("1st Place")).toBeInTheDocument();
    expect(screen.getByText("Oct 2023")).toBeInTheDocument();
  });

  it("renders hackathon image with correct alt text", () => {
    render(<HackathonCard {...mockHackathon} />);

    const image = screen.getByAltText("EcoTrack");
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so we check if it contains our image path (URL encoded)
    expect(image.getAttribute("src")).toContain("%2Fhackathon-image.jpg");
  });

  it("renders all technology tags", () => {
    render(<HackathonCard {...mockHackathon} />);

    mockHackathon.tech.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("renders GitHub and demo links when provided", () => {
    render(<HackathonCard {...mockHackathon} />);

    const githubLink = screen.getByRole("link", { name: /code/i });
    const demoLink = screen.getByRole("link", { name: /demo/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/user/ecotrack"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute("href", "https://ecotrack-demo.com");
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render links when not provided", () => {
    const hackathonWithoutLinks = {
      ...mockHackathon,
      github: undefined,
      demo: undefined,
    };

    render(<HackathonCard {...hackathonWithoutLinks} />);

    expect(
      screen.queryByRole("link", { name: /code/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /demo/i })
    ).not.toBeInTheDocument();
  });

  it("applies correct styling for 1st place position", () => {
    render(<HackathonCard {...mockHackathon} />);

    const positionBadge = screen.getByText("1st Place");
    expect(positionBadge).toHaveClass("text-yellow-600");
  });

  it("applies correct styling for 2nd place position", () => {
    const secondPlaceHackathon = { ...mockHackathon, position: "2nd Place" };
    render(<HackathonCard {...secondPlaceHackathon} />);

    const positionBadge = screen.getByText("2nd Place");
    expect(positionBadge).toHaveClass("text-gray-600");
  });

  it("applies correct styling for 3rd place position", () => {
    const thirdPlaceHackathon = { ...mockHackathon, position: "3rd Place" };
    render(<HackathonCard {...thirdPlaceHackathon} />);

    const positionBadge = screen.getByText("3rd Place");
    expect(positionBadge).toHaveClass("text-orange-600");
  });

  it("applies default styling for other positions", () => {
    const finalistHackathon = { ...mockHackathon, position: "Finalist" };
    render(<HackathonCard {...finalistHackathon} />);

    const positionBadge = screen.getByText("Finalist");
    expect(positionBadge).toHaveClass("text-primary");
  });

  it("handles winner position correctly", () => {
    const winnerHackathon = { ...mockHackathon, position: "Winner" };
    render(<HackathonCard {...winnerHackathon} />);

    const positionBadge = screen.getByText("Winner");
    expect(positionBadge).toHaveClass("text-yellow-600");
  });

  it("displays calendar icon with date", () => {
    render(<HackathonCard {...mockHackathon} />);

    const dateElement = screen.getByText("Oct 2023").closest("span");
    expect(dateElement).toBeInTheDocument();
  });

  it("handles long project names correctly", () => {
    const hackathonWithLongName = {
      ...mockHackathon,
      project: "Very Long Project Name That Might Need Wrapping",
    };

    render(<HackathonCard {...hackathonWithLongName} />);

    expect(
      screen.getByText("Very Long Project Name That Might Need Wrapping")
    ).toBeInTheDocument();
  });

  it("handles long descriptions correctly", () => {
    const hackathonWithLongDescription = {
      ...mockHackathon,
      description:
        "This is a very long description that should wrap properly and maintain good readability across multiple lines of text in the hackathon card component.",
    };

    render(<HackathonCard {...hackathonWithLongDescription} />);

    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });

  it("renders multiple hackathon cards without conflicts", () => {
    const hackathon1 = { ...mockHackathon, project: "Project A" };
    const hackathon2 = {
      ...mockHackathon,
      project: "Project B",
      name: "Different Hackathon",
      tech: ["Vue.js", "Node.js"],
      position: "2nd Place",
    };

    render(
      <div>
        <HackathonCard {...hackathon1} />
        <HackathonCard {...hackathon2} />
      </div>
    );

    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project B")).toBeInTheDocument();
    expect(screen.getByText("TechCrunch Disrupt 2023")).toBeInTheDocument();
    expect(screen.getByText("Different Hackathon")).toBeInTheDocument();
    expect(screen.getByText("Vue.js")).toBeInTheDocument();
    expect(screen.getByText("1st Place")).toBeInTheDocument();
    expect(screen.getByText("2nd Place")).toBeInTheDocument();
  });

  it("handles empty tech array", () => {
    const hackathonWithoutTech = { ...mockHackathon, tech: [] };
    render(<HackathonCard {...hackathonWithoutTech} />);

    expect(screen.getByText("EcoTrack")).toBeInTheDocument();
    expect(screen.queryByText("React Native")).not.toBeInTheDocument();
  });

  it("handles special characters in content", () => {
    const hackathonWithSpecialChars = {
      ...mockHackathon,
      project: "AI & ML Solution",
      description: "Built with React + TypeScript = ❤️",
      name: "Hack@Home 2023",
    };

    render(<HackathonCard {...hackathonWithSpecialChars} />);

    expect(screen.getByText("AI & ML Solution")).toBeInTheDocument();
    expect(
      screen.getByText("Built with React + TypeScript = ❤️")
    ).toBeInTheDocument();
    expect(screen.getByText("Hack@Home 2023")).toBeInTheDocument();
  });
});

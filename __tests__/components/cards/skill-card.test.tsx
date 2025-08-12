import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillCard } from "@/components/cards/skill-card";
import { SkillCardProps } from "@/types";
import { Code2 } from "lucide-react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

const mockSkill: SkillCardProps = {
  icon: <Code2 className="w-8 h-8" data-testid="skill-icon" />,
  title: "Frontend Development",
  description: "Building responsive and interactive user interfaces",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
};

describe("SkillCard", () => {
  it("renders skill information correctly", () => {
    render(<SkillCard {...mockSkill} />);

    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(
      screen.getByText("Building responsive and interactive user interfaces")
    ).toBeInTheDocument();
  });

  it("renders the skill icon", () => {
    render(<SkillCard {...mockSkill} />);

    const icon = screen.getByTestId("skill-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-8", "h-8");
  });

  it("renders all skill tags", () => {
    render(<SkillCard {...mockSkill} />);

    mockSkill.skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("applies correct styling to skill tags", () => {
    render(<SkillCard {...mockSkill} />);

    const reactTag = screen.getByText("React");
    expect(reactTag).toHaveClass(
      "px-2",
      "py-1",
      "text-xs",
      "rounded-md",
      "bg-muted",
      "text-muted-foreground"
    );
  });

  it("handles empty skills array", () => {
    const skillWithoutTags = { ...mockSkill, skills: [] };
    render(<SkillCard {...skillWithoutTags} />);

    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(
      screen.getByText("Building responsive and interactive user interfaces")
    ).toBeInTheDocument();

    // Should not render any skill tags
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("handles long skill names correctly", () => {
    const skillWithLongNames = {
      ...mockSkill,
      skills: [
        "Very Long Skill Name That Might Wrap",
        "Another Long Technology Name",
      ],
    };

    render(<SkillCard {...skillWithLongNames} />);

    expect(
      screen.getByText("Very Long Skill Name That Might Wrap")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Another Long Technology Name")
    ).toBeInTheDocument();
  });

  it("renders with different icon types", () => {
    const skillWithDifferentIcon = {
      ...mockSkill,
      icon: <div data-testid="custom-icon">Custom Icon</div>,
    };

    render(<SkillCard {...skillWithDifferentIcon} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByText("Custom Icon")).toBeInTheDocument();
  });

  it("handles long descriptions", () => {
    const skillWithLongDescription = {
      ...mockSkill,
      description:
        "This is a very long description that should wrap properly and maintain good readability across multiple lines of text in the skill card component.",
    };

    render(<SkillCard {...skillWithLongDescription} />);

    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });

  it("renders multiple skill cards without conflicts", () => {
    const skill1 = { ...mockSkill, title: "Frontend" };
    const skill2 = {
      ...mockSkill,
      title: "Backend",
      skills: ["Node.js", "Python", "MongoDB"],
    };

    render(
      <div>
        <SkillCard {...skill1} />
        <SkillCard {...skill2} />
      </div>
    );

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
});

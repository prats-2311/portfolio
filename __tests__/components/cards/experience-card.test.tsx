import React from "react";
import { render, screen } from "@testing-library/react";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ExperienceCardProps } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
}));

const mockExperience: ExperienceCardProps = {
  company: "Tech Innovations Inc.",
  role: "Senior Full Stack Developer",
  period: "2022 - Present",
  location: "San Francisco, CA",
  description: [
    "Led development of microservices architecture serving 1M+ users",
    "Mentored junior developers and conducted code reviews",
    "Implemented CI/CD pipelines reducing deployment time by 60%",
  ],
};

describe("ExperienceCard", () => {
  it("renders experience information correctly", () => {
    render(<ExperienceCard {...mockExperience} />);

    expect(screen.getByText("Senior Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Tech Innovations Inc.")).toBeInTheDocument();
    expect(screen.getByText("2022 - Present")).toBeInTheDocument();
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
  });

  it("renders all description items", () => {
    render(<ExperienceCard {...mockExperience} />);

    mockExperience.description.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("displays calendar and location icons", () => {
    render(<ExperienceCard {...mockExperience} />);

    // Check for Calendar and MapPin icons by looking for their parent elements
    const periodElement = screen.getByText("2022 - Present").closest("span");
    const locationElement = screen
      .getByText("San Francisco, CA")
      .closest("span");

    expect(periodElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
  });

  it("applies timeline styling classes", () => {
    const { container } = render(<ExperienceCard {...mockExperience} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      "relative",
      "pl-8",
      "pb-8",
      "border-l",
      "border-border"
    );
  });

  it("handles empty description array", () => {
    const experienceWithoutDescription = {
      ...mockExperience,
      description: [],
    };

    render(<ExperienceCard {...experienceWithoutDescription} />);

    expect(screen.getByText("Senior Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Tech Innovations Inc.")).toBeInTheDocument();

    // Should not render any description items
    expect(screen.queryByText("Led development")).not.toBeInTheDocument();
  });

  it("handles single description item", () => {
    const experienceWithSingleDescription = {
      ...mockExperience,
      description: ["Single responsibility item"],
    };

    render(<ExperienceCard {...experienceWithSingleDescription} />);

    expect(screen.getByText("Single responsibility item")).toBeInTheDocument();
  });

  it("renders long company names correctly", () => {
    const experienceWithLongCompanyName = {
      ...mockExperience,
      company: "Very Long Company Name That Might Need Wrapping Inc.",
    };

    render(<ExperienceCard {...experienceWithLongCompanyName} />);

    expect(
      screen.getByText("Very Long Company Name That Might Need Wrapping Inc.")
    ).toBeInTheDocument();
  });

  it("renders long role titles correctly", () => {
    const experienceWithLongRole = {
      ...mockExperience,
      role: "Senior Principal Full Stack Software Engineer and Technical Lead",
    };

    render(<ExperienceCard {...experienceWithLongRole} />);

    expect(
      screen.getByText(
        "Senior Principal Full Stack Software Engineer and Technical Lead"
      )
    ).toBeInTheDocument();
  });

  it("handles remote location correctly", () => {
    const remoteExperience = {
      ...mockExperience,
      location: "Remote",
    };

    render(<ExperienceCard {...remoteExperience} />);

    expect(screen.getByText("Remote")).toBeInTheDocument();
  });

  it("renders multiple experience cards without conflicts", () => {
    const experience1 = { ...mockExperience, company: "Company A" };
    const experience2 = {
      ...mockExperience,
      company: "Company B",
      role: "Frontend Developer",
      description: ["Built user interfaces", "Optimized performance"],
    };

    render(
      <div>
        <ExperienceCard {...experience1} />
        <ExperienceCard {...experience2} />
      </div>
    );

    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("Company B")).toBeInTheDocument();
    expect(screen.getByText("Senior Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Built user interfaces")).toBeInTheDocument();
  });

  it("handles special characters in descriptions", () => {
    const experienceWithSpecialChars = {
      ...mockExperience,
      description: [
        "Improved performance by 50% & reduced costs",
        "Led team of 5+ developers (including contractors)",
        "Implemented OAuth 2.0/JWT authentication",
      ],
    };

    render(<ExperienceCard {...experienceWithSpecialChars} />);

    expect(
      screen.getByText("Improved performance by 50% & reduced costs")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Led team of 5+ developers (including contractors)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Implemented OAuth 2.0/JWT authentication")
    ).toBeInTheDocument();
  });
});

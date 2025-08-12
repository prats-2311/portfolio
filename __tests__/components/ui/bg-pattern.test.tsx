import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BGPattern } from "@/components/ui/bg-pattern";

describe("BGPattern", () => {
  it("renders with default props", () => {
    render(<BGPattern data-testid="bg-pattern" />);
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toBeInTheDocument();
    expect(pattern).toHaveClass("absolute", "inset-0", "z-[-10]", "size-full");
    expect(pattern).toHaveStyle({
      backgroundSize: "24px 24px",
    });
  });

  it("applies correct classes for different mask variants", () => {
    const { rerender } = render(
      <BGPattern mask="fade-edges" data-testid="bg-pattern" />
    );
    let pattern = screen.getByTestId("bg-pattern");
    expect(pattern).toHaveClass(
      "[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]"
    );

    rerender(<BGPattern mask="fade-center" data-testid="bg-pattern" />);
    pattern = screen.getByTestId("bg-pattern");
    expect(pattern).toHaveClass(
      "[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]"
    );

    rerender(<BGPattern mask="none" data-testid="bg-pattern" />);
    pattern = screen.getByTestId("bg-pattern");
    expect(pattern).not.toHaveClass(
      "[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]"
    );
    expect(pattern).not.toHaveClass(
      "[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]"
    );
  });

  describe("pattern variants", () => {
    it("generates correct background image for dots variant", () => {
      render(<BGPattern variant="dots" fill="red" data-testid="bg-pattern" />);
      const pattern = screen.getByTestId("bg-pattern");

      expect(pattern).toHaveStyle({
        backgroundImage: "radial-gradient(red 1px, transparent 1px)",
      });
    });

    it("generates correct background image for grid variant", () => {
      render(<BGPattern variant="grid" fill="blue" data-testid="bg-pattern" />);
      const pattern = screen.getByTestId("bg-pattern");

      expect(pattern).toHaveStyle({
        backgroundImage:
          "linear-gradient(to right, blue 1px, transparent 1px), linear-gradient(to bottom, blue 1px, transparent 1px)",
      });
    });

    it("generates correct background image for diagonal-stripes variant", () => {
      render(
        <BGPattern
          variant="diagonal-stripes"
          fill="green"
          size={20}
          data-testid="bg-pattern"
        />
      );
      const pattern = screen.getByTestId("bg-pattern");

      expect(pattern).toHaveStyle({
        backgroundImage:
          "repeating-linear-gradient(45deg, green, green 1px, transparent 1px, transparent 20px)",
      });
    });
  });

  it("applies custom size correctly", () => {
    render(<BGPattern size={48} data-testid="bg-pattern" />);
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toHaveStyle({
      backgroundSize: "48px 48px",
    });
  });

  it("applies custom fill color", () => {
    render(
      <BGPattern
        variant="dots"
        fill="rgba(255,0,0,0.5)"
        data-testid="bg-pattern"
      />
    );
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toHaveStyle({
      backgroundImage:
        "radial-gradient(rgba(255,0,0,0.5) 1px, transparent 1px)",
    });
  });

  it("applies custom className", () => {
    render(<BGPattern className="custom-class" data-testid="bg-pattern" />);
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toHaveClass("custom-class");
  });

  it("applies custom style props", () => {
    const customStyle = { opacity: 0.5, zIndex: 10 };
    render(<BGPattern style={customStyle} data-testid="bg-pattern" />);
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toHaveStyle(customStyle);
  });

  it("forwards additional props to the div element", () => {
    render(
      <BGPattern data-testid="bg-pattern" aria-label="Background pattern" />
    );
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toHaveAttribute("aria-label", "Background pattern");
  });

  it("handles undefined background image gracefully", () => {
    // Test with an invalid variant that would return undefined
    render(<BGPattern variant={"invalid" as any} data-testid="bg-pattern" />);
    const pattern = screen.getByTestId("bg-pattern");

    expect(pattern).toBeInTheDocument();
    expect(pattern).toHaveStyle({
      backgroundImage: "",
    });
  });

  describe("size parameter in diagonal-stripes", () => {
    it("uses size parameter correctly in diagonal-stripes pattern", () => {
      render(
        <BGPattern
          variant="diagonal-stripes"
          size={30}
          fill="purple"
          data-testid="bg-pattern"
        />
      );
      const pattern = screen.getByTestId("bg-pattern");

      expect(pattern).toHaveStyle({
        backgroundImage:
          "repeating-linear-gradient(45deg, purple, purple 1px, transparent 1px, transparent 30px)",
        backgroundSize: "30px 30px",
      });
    });
  });

  describe("accessibility", () => {
    it("has appropriate z-index for background element", () => {
      render(<BGPattern data-testid="bg-pattern" />);
      const pattern = screen.getByTestId("bg-pattern");

      expect(pattern).toHaveClass("z-[-10]");
    });

    it("uses absolute positioning to stay in background", () => {
      render(<BGPattern data-testid="bg-pattern" />);
      const pattern = screen.getByTestId("bg-pattern");

      expect(pattern).toHaveClass("absolute", "inset-0");
    });
  });
});

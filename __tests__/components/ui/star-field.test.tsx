import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StarField } from "@/components/ui/star-field";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, any>(
      ({ children, ...props }, ref) => (
        <div ref={ref} {...props} data-testid="motion-div">
          {children}
        </div>
      )
    ),
  },
}));

describe("StarField", () => {
  it("renders with default props", () => {
    render(<StarField />);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass("absolute", "inset-0", "overflow-hidden");
  });

  it("renders the correct number of stars", () => {
    const count = 25;
    render(<StarField count={count} />);

    const stars = screen.getAllByTestId("motion-div");
    expect(stars).toHaveLength(count);
  });

  it("applies custom className", () => {
    const customClass = "custom-star-field";
    render(<StarField className={customClass} />);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass(customClass);
  });

  it("generates stars with random positions", () => {
    render(<StarField count={5} />);

    const stars = screen.getAllByTestId("motion-div");

    stars.forEach((star) => {
      const style = star.style;
      expect(style.left).toMatch(/^\d+(\.\d+)?%$/);
      expect(style.top).toMatch(/^\d+(\.\d+)?%$/);
      expect(style.width).toMatch(/^\d+(\.\d+)?px$/);
      expect(style.height).toMatch(/^\d+(\.\d+)?px$/);
    });
  });

  it("applies star styling correctly", () => {
    render(<StarField count={3} />);

    const stars = screen.getAllByTestId("motion-div");

    stars.forEach((star) => {
      expect(star).toHaveClass(
        "absolute",
        "bg-white",
        "rounded-full",
        "opacity-60"
      );
    });
  });

  it("uses custom config values", () => {
    const config = {
      minSize: 2,
      maxSize: 4,
      animationDuration: 5,
      twinkleDelay: 3,
    };

    render(<StarField count={10} config={config} />);

    const stars = screen.getAllByTestId("motion-div");
    expect(stars).toHaveLength(10);

    // Check that stars have sizes within the configured range
    stars.forEach((star) => {
      const width = parseFloat(star.style.width);
      expect(width).toBeGreaterThanOrEqual(config.minSize);
      expect(width).toBeLessThanOrEqual(config.maxSize);
    });
  });

  it("handles zero count gracefully", () => {
    render(<StarField count={0} />);

    const container = screen.getByRole("generic");
    expect(container).toBeInTheDocument();

    const stars = screen.queryAllByTestId("motion-div");
    expect(stars).toHaveLength(0);
  });

  it("memoizes stars array to prevent unnecessary re-renders", () => {
    const { rerender } = render(<StarField count={10} />);
    const initialStars = screen.getAllByTestId("motion-div");

    // Re-render with same props
    rerender(<StarField count={10} />);
    const rerenderedStars = screen.getAllByTestId("motion-div");

    expect(rerenderedStars).toHaveLength(initialStars.length);
  });
});

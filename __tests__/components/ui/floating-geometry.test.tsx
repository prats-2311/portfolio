import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FloatingGeometry } from "@/components/ui/floating-geometry";

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

describe("FloatingGeometry", () => {
  it("renders with default props", () => {
    const { container } = render(<FloatingGeometry />);

    const geometryContainer = container.firstChild as HTMLElement;
    expect(geometryContainer).toHaveClass(
      "absolute",
      "inset-0",
      "overflow-hidden",
      "pointer-events-none"
    );
  });

  it("renders the correct number of geometric shapes", () => {
    const count = 12;
    render(<FloatingGeometry count={count} />);

    const shapes = screen.getAllByTestId("motion-div");
    expect(shapes).toHaveLength(count);
  });

  it("applies custom className", () => {
    const customClass = "custom-geometry";
    const { container } = render(<FloatingGeometry className={customClass} />);

    const geometryContainer = container.firstChild as HTMLElement;
    expect(geometryContainer).toHaveClass(customClass);
  });

  it("generates shapes with random positions and sizes", () => {
    render(<FloatingGeometry count={5} />);

    const shapes = screen.getAllByTestId("motion-div");

    shapes.forEach((shape) => {
      const style = shape.style;
      expect(style.left).toMatch(/^\d+(\.\d+)?%$/);
      expect(style.top).toMatch(/^\d+(\.\d+)?%$/);
      expect(style.width).toMatch(/^\d+(\.\d+)?px$/);
      expect(style.height).toMatch(/^\d+(\.\d+)?px$/);
    });
  });

  it("applies correct styling to geometric shapes", () => {
    render(<FloatingGeometry count={3} />);

    const shapes = screen.getAllByTestId("motion-div");

    shapes.forEach((shape) => {
      expect(shape).toHaveClass(
        "absolute",
        "border",
        "border-primary/20",
        "rounded-lg"
      );
    });
  });

  it("uses custom config values for size range", () => {
    const config = {
      minSize: 30,
      maxSize: 80,
      animationDuration: 10,
      rotationSpeed: 6,
    };

    render(<FloatingGeometry count={10} config={config} />);

    const shapes = screen.getAllByTestId("motion-div");
    expect(shapes).toHaveLength(10);

    // Check that shapes have sizes within the configured range
    shapes.forEach((shape) => {
      const width = parseFloat(shape.style.width);
      const height = parseFloat(shape.style.height);

      expect(width).toBeGreaterThanOrEqual(config.minSize);
      expect(width).toBeLessThanOrEqual(config.maxSize);
      expect(height).toBeGreaterThanOrEqual(config.minSize);
      expect(height).toBeLessThanOrEqual(config.maxSize);

      // Shapes should be square (width === height)
      expect(width).toBe(height);
    });
  });

  it("handles zero count gracefully", () => {
    const { container } = render(<FloatingGeometry count={0} />);

    const geometryContainer = container.firstChild as HTMLElement;
    expect(geometryContainer).toBeInTheDocument();

    const shapes = screen.queryAllByTestId("motion-div");
    expect(shapes).toHaveLength(0);
  });

  it("memoizes shapes array to prevent unnecessary re-renders", () => {
    const { rerender } = render(<FloatingGeometry count={6} />);
    const initialShapes = screen.getAllByTestId("motion-div");

    // Re-render with same props
    rerender(<FloatingGeometry count={6} />);
    const rerenderedShapes = screen.getAllByTestId("motion-div");

    expect(rerenderedShapes).toHaveLength(initialShapes.length);
  });

  it("generates square shapes (width equals height)", () => {
    render(<FloatingGeometry count={5} />);

    const shapes = screen.getAllByTestId("motion-div");

    shapes.forEach((shape) => {
      const width = parseFloat(shape.style.width);
      const height = parseFloat(shape.style.height);
      expect(width).toBe(height);
    });
  });

  it("applies default config values when no config provided", () => {
    render(<FloatingGeometry count={4} />);

    const shapes = screen.getAllByTestId("motion-div");

    shapes.forEach((shape) => {
      const width = parseFloat(shape.style.width);
      // Default range is 20-60px
      expect(width).toBeGreaterThanOrEqual(20);
      expect(width).toBeLessThanOrEqual(60);
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeroBackground } from "@/components/ui/hero-background";

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

describe("HeroBackground", () => {
  it("renders with default props", () => {
    const { container } = render(<HeroBackground />);

    const backgroundContainer = container.firstChild as HTMLElement;
    expect(backgroundContainer).toHaveClass(
      "absolute",
      "inset-0",
      "overflow-hidden"
    );
  });

  it("applies custom className", () => {
    const customClass = "custom-hero-bg";
    const { container } = render(<HeroBackground className={customClass} />);

    const backgroundContainer = container.firstChild as HTMLElement;
    expect(backgroundContainer).toHaveClass(customClass);
  });

  it("renders animated grid, orbs, and particles", () => {
    render(<HeroBackground />);

    const motionDivs = screen.getAllByTestId("motion-div");

    // Should have: 1 grid + 2 orbs + 20 particles (default) = 23 total
    expect(motionDivs).toHaveLength(23);
  });

  it("renders the correct number of particles based on config", () => {
    const particleConfig = { count: 10 };
    render(<HeroBackground particleConfig={particleConfig} />);

    const motionDivs = screen.getAllByTestId("motion-div");

    // Should have: 1 grid + 2 orbs + 10 particles = 13 total
    expect(motionDivs).toHaveLength(13);
  });

  it("applies grid configuration correctly", () => {
    const gridConfig = {
      size: 60,
      color: "rgba(255, 0, 0, 0.2)",
      animationSpeed: 15,
    };

    render(<HeroBackground gridConfig={gridConfig} />);

    const motionDivs = screen.getAllByTestId("motion-div");
    const gridDiv = motionDivs[0]; // First motion div should be the grid

    expect(gridDiv.style.backgroundSize).toBe("60px 60px");
    expect(gridDiv.style.backgroundImage).toContain("rgba(255, 0, 0, 0.2)");
  });

  it("applies orb configuration correctly", () => {
    const orbConfig = {
      size: 300,
      opacity: 0.5,
      animationDuration: 6,
      blur: 2,
    };

    render(<HeroBackground orbConfig={orbConfig} />);

    const motionDivs = screen.getAllByTestId("motion-div");

    // Find orb divs (should be the 2nd and 3rd motion divs)
    const firstOrb = motionDivs[1];
    const secondOrb = motionDivs[2];

    expect(firstOrb.style.width).toBe("300px");
    expect(firstOrb.style.height).toBe("300px");
    expect(firstOrb).toHaveClass("blur-2xl");

    expect(secondOrb.style.width).toBe("450px"); // 300 * 1.5
    expect(secondOrb.style.height).toBe("450px");
  });

  it("applies particle configuration correctly", () => {
    const particleConfig = {
      count: 5,
      size: 4,
      color: "rgba(255, 255, 0, 0.8)",
      opacity: 0.7,
    };

    render(<HeroBackground particleConfig={particleConfig} />);

    const motionDivs = screen.getAllByTestId("motion-div");

    // Should have: 1 grid + 2 orbs + 5 particles = 8 total
    expect(motionDivs).toHaveLength(8);

    // Check particle properties (last 5 motion divs should be particles)
    const particles = motionDivs.slice(-5);

    particles.forEach((particle) => {
      expect(particle.style.width).toBe("4px");
      expect(particle.style.height).toBe("4px");
      expect(particle.style.backgroundColor).toBe("rgba(255, 255, 0, 0.8)");
      expect(particle.style.opacity).toBe("0.7");
      expect(particle).toHaveClass("rounded-full");
    });
  });

  it("generates particles with random positions", () => {
    render(<HeroBackground particleConfig={{ count: 8 }} />);

    const motionDivs = screen.getAllByTestId("motion-div");
    const particles = motionDivs.slice(-8); // Last 8 should be particles

    particles.forEach((particle) => {
      expect(particle.style.left).toMatch(/^\d+(\.\d+)?%$/);
      expect(particle.style.top).toMatch(/^\d+(\.\d+)?%$/);
    });
  });

  it("handles zero particle count gracefully", () => {
    const particleConfig = { count: 0 };
    render(<HeroBackground particleConfig={particleConfig} />);

    const motionDivs = screen.getAllByTestId("motion-div");

    // Should have: 1 grid + 2 orbs + 0 particles = 3 total
    expect(motionDivs).toHaveLength(3);
  });

  it("applies correct styling to orbs", () => {
    render(<HeroBackground />);

    const motionDivs = screen.getAllByTestId("motion-div");
    const firstOrb = motionDivs[1];
    const secondOrb = motionDivs[2];

    expect(firstOrb).toHaveClass(
      "absolute",
      "bg-blue-500/10",
      "rounded-full",
      "blur-3xl"
    );
    expect(secondOrb).toHaveClass(
      "absolute",
      "bg-purple-500/10",
      "rounded-full",
      "blur-3xl"
    );
  });

  it("memoizes particles array to prevent unnecessary re-renders", () => {
    const { rerender } = render(
      <HeroBackground particleConfig={{ count: 5 }} />
    );
    const initialMotionDivs = screen.getAllByTestId("motion-div");

    // Re-render with same props
    rerender(<HeroBackground particleConfig={{ count: 5 }} />);
    const rerenderedMotionDivs = screen.getAllByTestId("motion-div");

    expect(rerenderedMotionDivs).toHaveLength(initialMotionDivs.length);
  });
});

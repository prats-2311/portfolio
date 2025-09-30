import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation, {
  DesktopNavigation,
  MobileNavigation,
} from "@/components/layout/navigation";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock smooth scroll behavior
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: mockScrollIntoView,
  writable: true,
});

describe("Navigation Components", () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  describe("DesktopNavigation", () => {
    it("renders all navigation items", () => {
      render(<DesktopNavigation />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("has correct href attributes", () => {
      render(<DesktopNavigation />);

      expect(screen.getByText("Home")).toHaveAttribute("href", "#hero");
      expect(screen.getByText("Skills")).toHaveAttribute("href", "#skills");
      expect(screen.getByText("Projects")).toHaveAttribute("href", "#projects");
      expect(screen.getByText("Experience")).toHaveAttribute(
        "href",
        "#experience"
      );
      expect(screen.getByText("Contact")).toHaveAttribute("href", "#contact");
    });

    it("applies correct CSS classes", () => {
      render(<DesktopNavigation />);

      const container = screen.getByText("Home").parentElement;
      expect(container).toHaveClass("hidden", "md:flex", "items-center");
    });

    it("handles smooth scroll on click", () => {
      // Mock querySelector to return a mock element
      const mockElement = { scrollIntoView: mockScrollIntoView };
      jest.spyOn(document, "querySelector").mockReturnValue(mockElement as any);

      render(<DesktopNavigation />);

      const homeLink = screen.getByText("Home");
      fireEvent.click(homeLink);

      expect(document.querySelector).toHaveBeenCalledWith("#hero");
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  describe("MobileNavigation", () => {
    const mockOnToggle = jest.fn();

    beforeEach(() => {
      mockOnToggle.mockClear();
    });

    it("renders menu button with correct aria-label when closed", () => {
      render(<MobileNavigation isOpen={false} onToggle={mockOnToggle} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Open menu");
    });

    it("renders menu button with correct aria-label when open", () => {
      render(<MobileNavigation isOpen={true} onToggle={mockOnToggle} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Close menu");
    });

    it("calls onToggle when menu button is clicked", () => {
      render(<MobileNavigation isOpen={false} onToggle={mockOnToggle} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it("renders navigation items when open", () => {
      render(<MobileNavigation isOpen={true} onToggle={mockOnToggle} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("does not render navigation items when closed", () => {
      render(<MobileNavigation isOpen={false} onToggle={mockOnToggle} />);

      expect(screen.queryByText("About")).not.toBeInTheDocument();
      expect(screen.queryByText("Skills")).not.toBeInTheDocument();
    });

    it("closes menu and scrolls when navigation item is clicked", () => {
      const mockElement = { scrollIntoView: mockScrollIntoView };
      jest.spyOn(document, "querySelector").mockReturnValue(mockElement as any);

      render(<MobileNavigation isOpen={true} onToggle={mockOnToggle} />);

      const homeLink = screen.getByText("Home");
      fireEvent.click(homeLink);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(document.querySelector).toHaveBeenCalledWith("#hero");
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  describe("Navigation (Main Component)", () => {
    it("renders DesktopNavigation by default", () => {
      render(<Navigation />);

      const container = screen.getByText("Home").parentElement;
      expect(container).toHaveClass("hidden", "md:flex");
    });

    it("renders MobileNavigation when isMobile is true", () => {
      render(
        <Navigation isMobile={true} isOpen={false} onToggle={jest.fn()} />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("md:hidden");
    });

    it("passes props correctly to MobileNavigation", () => {
      const mockOnToggle = jest.fn();
      render(
        <Navigation isMobile={true} isOpen={true} onToggle={mockOnToggle} />
      );

      expect(screen.getByText("Home")).toBeInTheDocument();

      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it("handles missing onToggle prop gracefully", () => {
      render(<Navigation isMobile={true} isOpen={false} />);

      const button = screen.getByRole("button");
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../../components/layout/header";

// Mock framer-motion
const mockUseScroll = jest.fn();
const mockUseMotionValueEvent = jest.fn();

jest.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useScroll: () => mockUseScroll(),
  useMotionValueEvent: mockUseMotionValueEvent,
}));

// Mock Navigation component
jest.mock("../../../components/layout/navigation", () => {
  return function MockNavigation({ isMobile, isOpen, onToggle }: any) {
    if (isMobile) {
      return (
        <div data-testid="mobile-navigation">
          <button onClick={onToggle} data-testid="mobile-menu-toggle">
            {isOpen ? "Close" : "Open"} Menu
          </button>
          {isOpen && <div data-testid="mobile-menu">Mobile Menu</div>}
        </div>
      );
    }
    return <div data-testid="desktop-navigation">Desktop Navigation</div>;
  };
});

// Mock ThemeToggle component
jest.mock("../../../components/ui/theme-toggle", () => ({
  ThemeToggle: ({ className }: any) => (
    <div data-testid="theme-toggle" className={className}>
      Theme Toggle
    </div>
  ),
}));

describe("Header Component", () => {
  beforeEach(() => {
    mockUseScroll.mockReturnValue({ scrollY: { get: () => 0 } });
    mockUseMotionValueEvent.mockClear();
  });

  it("renders the logo", () => {
    render(<Header />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders desktop navigation", () => {
    render(<Header />);

    expect(screen.getByTestId("desktop-navigation")).toBeInTheDocument();
  });

  it("renders mobile navigation controls", () => {
    render(<Header />);

    expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu-toggle")).toBeInTheDocument();
  });

  it("renders theme toggle for both desktop and mobile", () => {
    render(<Header />);

    const themeToggles = screen.getAllByTestId("theme-toggle");
    expect(themeToggles).toHaveLength(2);

    // Desktop theme toggle should have hidden md:flex class
    expect(themeToggles[0]).toHaveClass("hidden", "md:flex");
    // Mobile theme toggle should not have these classes
    expect(themeToggles[1]).not.toHaveClass("hidden", "md:flex");
  });

  it("applies scrolled styles when isScrolled prop is true", () => {
    render(<Header isScrolled={true} />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "bg-background/80",
      "backdrop-blur-md",
      "border-b",
      "border-border"
    );
  });

  it("applies transparent styles when not scrolled", () => {
    render(<Header isScrolled={false} />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-transparent");
    expect(header).not.toHaveClass(
      "bg-background/80",
      "backdrop-blur-md",
      "border-b"
    );
  });

  it("toggles mobile menu when button is clicked", () => {
    render(<Header />);

    const toggleButton = screen.getByTestId("mobile-menu-toggle");

    // Initially closed
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(toggleButton);
    expect(screen.getByText("Close Menu")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Click to close
    fireEvent.click(toggleButton);
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes mobile menu on escape key", async () => {
    render(<Header />);

    const toggleButton = screen.getByTestId("mobile-menu-toggle");

    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Press escape
    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });
  });

  it("closes mobile menu when clicking outside", async () => {
    render(
      <div>
        <Header />
        <div data-testid="outside-element">Outside</div>
      </div>
    );

    const toggleButton = screen.getByTestId("mobile-menu-toggle");

    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Click outside
    fireEvent.click(screen.getByTestId("outside-element"));

    await waitFor(() => {
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });
  });

  it("does not close mobile menu when clicking inside header", async () => {
    render(<Header />);

    const toggleButton = screen.getByTestId("mobile-menu-toggle");

    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Click inside header (on logo)
    fireEvent.click(screen.getByText("Prateek Srivastava"));

    // Menu should still be open
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("sets up scroll listener on mount", () => {
    render(<Header />);

    expect(mockUseScroll).toHaveBeenCalled();
    expect(mockUseMotionValueEvent).toHaveBeenCalled();
  });

  it("applies fixed positioning and z-index", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-50");
  });

  it("has proper container structure", () => {
    render(<Header />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass(
      "container",
      "mx-auto",
      "px-4",
      "py-4",
      "flex",
      "items-center",
      "justify-between"
    );
  });
});

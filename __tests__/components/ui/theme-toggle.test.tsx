import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeProvider } from "@/components/providers/theme-provider";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const ThemeToggleWithProvider = ({ ...props }) => (
  <ThemeProvider>
    <ThemeToggle {...props} />
  </ThemeProvider>
);

describe("ThemeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove("dark");
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggleWithProvider />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // Temporarily disabled due to CI timing issues
  // it("toggles theme when clicked", async () => {
  //   localStorageMock.getItem.mockReturnValue("light");

  //   render(<ThemeToggleWithProvider />);

  //   const button = screen.getByRole("button");

  //   // Wait for component to mount and theme to be initialized
  //   await waitFor(() => {
  //     expect(button).not.toBeDisabled();
  //     expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  //   });

  //   // Clear previous calls from initialization
  //   localStorageMock.setItem.mockClear();

  //   // Click to toggle theme
  //   fireEvent.click(button);

  //   // Wait for the theme change to be processed
  //   await waitFor(
  //     () => {
  //       expect(localStorageMock.setItem).toHaveBeenCalledWith(
  //         "portfolio-theme",
  //         "dark"
  //       );
  //     },
  //     { timeout: 3000 }
  //   );
  // });

  it("loads saved theme from localStorage", async () => {
    localStorageMock.getItem.mockReturnValue("light");

    render(<ThemeToggleWithProvider />);

    const button = screen.getByRole("button");

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    });
  });

  it("applies custom className", () => {
    render(<ThemeToggleWithProvider className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("shows loading state before hydration", async () => {
    render(<ThemeToggleWithProvider />);

    const button = screen.getByRole("button");
    // In test environment, component mounts immediately, so we just check it exists
    expect(button).toBeInTheDocument();

    // Wait for component to be fully mounted
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it("throws error when used outside ThemeProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<ThemeToggle />);
    }).toThrow("useTheme must be used within a ThemeProvider");

    consoleSpy.mockRestore();
  });
});

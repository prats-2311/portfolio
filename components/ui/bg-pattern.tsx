import * as React from "react";
import { cn } from "@/lib/utils";

interface BGPatternProps extends React.ComponentProps<"div"> {
  variant?: "dots" | "grid" | "diagonal-stripes";
  mask?: "fade-edges" | "fade-center" | "none";
  size?: number;
  fill?: string;
}

const maskClasses = {
  "fade-edges":
    "[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]",
  "fade-center":
    "[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]",
  none: "",
};

function getBgImage(
  variant: string,
  fill: string,
  size: number
): string | undefined {
  switch (variant) {
    case "dots":
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "diagonal-stripes":
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    default:
      return undefined;
  }
}

export function BGPattern({
  variant = "grid",
  mask = "none",
  size = 24,
  fill = "rgba(255,255,255,0.1)",
  className,
  style,
  ...props
}: BGPatternProps) {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn(
        "absolute inset-0 z-[-10] size-full",
        maskClasses[mask],
        className
      )}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        ...style,
      }}
      {...props}
    />
  );
}

export default BGPattern;

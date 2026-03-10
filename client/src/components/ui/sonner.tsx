import React from "react";

interface SonnerProps {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}

export function Toaster({ position = "bottom-right" }: SonnerProps) {
  return (
    <div
      className="fixed z-50 flex flex-col gap-2 p-4"
      style={{
        [position.includes("top") ? "top" : "bottom"]: "1rem",
        [position.includes("left")
          ? "left"
          : position.includes("right")
            ? "right"
            : "left"]: "50%",
        transform:
          position === "top-center" || position === "bottom-center"
            ? "translateX(-50%)"
            : undefined,
      }}
    />
  );
}

import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  size: "small" | "medium" | "large";
  color: "pink" | "teal" | "light";
  children: React.ReactNode;
  onClick?: () => void;
}
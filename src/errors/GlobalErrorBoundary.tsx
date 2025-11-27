import { GlobalErrorsProps } from "@/types";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
const FallbackUI = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h2>Something went wrong.</h2>
    <p>Please refresh the page.</p>
  </div>
);

const GlobalErrorBoundary: React.FC<GlobalErrorsProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>{children}</ErrorBoundary>
  );
};

export default GlobalErrorBoundary;

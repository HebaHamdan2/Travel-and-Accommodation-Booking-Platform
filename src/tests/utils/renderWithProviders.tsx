import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import GlobalNotification from "../../components/GlobalNotification";
import { AppProviders } from "@/providers/AppProviders";

const renderWithProviders = (
  Component: React.ReactElement,
  options: RenderOptions = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AppProviders>
        <MemoryRouter>
          {children}
          <GlobalNotification />
        </MemoryRouter>
      </AppProviders>
    );
  }
  return render(Component, { wrapper: Wrapper, ...options });
};

export default renderWithProviders;

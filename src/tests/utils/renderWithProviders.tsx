import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { store } from "../../app/store";
import { MemoryRouter } from "react-router-dom";

const renderWithProviders = (
  Component: React.ReactElement,
  options: RenderOptions = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter>
        <Provider store={store}>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </Provider>
      </MemoryRouter>
    );
  }
  return render(Component, { wrapper: Wrapper, ...options });
};

export default renderWithProviders;

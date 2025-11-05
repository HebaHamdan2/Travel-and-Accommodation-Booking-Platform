import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { store } from "../../app/store";

const renderWithProviders = (
  Component: React.ReactElement,
  options: RenderOptions = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </Provider>
    );
  }
  return render(Component, { wrapper: Wrapper, ...options });
};

export default renderWithProviders;

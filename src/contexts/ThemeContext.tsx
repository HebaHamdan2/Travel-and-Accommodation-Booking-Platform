import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import { ThemeContextType, ThemeProps } from "../types";
import { getDesignTokens } from "../theme";
import { initialThemeVlaue } from "../utils/constans";
export const ThemeContext = createContext<ThemeContextType>(initialThemeVlaue);

export const ThemeContextProvider: React.FC<ThemeProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("themeMode") as PaletteMode) || "light"
  );
  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

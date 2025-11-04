import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import { ThemeContextType,ThemeProps } from "../types";
import { initialThemeVlaue } from "../constants";
import { getDesignTokens } from "../theme";
export const ThemeContext = createContext<ThemeContextType>(initialThemeVlaue);

export const ThemeContextProvider: React.FC<ThemeProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

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

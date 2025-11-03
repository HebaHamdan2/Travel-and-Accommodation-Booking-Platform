import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import { getDesignTokens } from "../Theme/theme";
import { ThemeContextType,ThemeProps } from "../types";
const initialVlaue: ThemeContextType = {
  mode: "light",
  toggleMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialVlaue);

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

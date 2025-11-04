import { PaletteMode } from "@mui/material";
import { ReactNode } from "react";

export interface ThemeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
}
export interface ThemeProps {
  children: ReactNode;
}
export interface LoginValues {
  userName: string;
  password: string;
}
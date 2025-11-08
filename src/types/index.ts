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
export interface DecodedToken {
  user_id: string;
  given_name: string;
  family_name: string;
  userType: string;
  nbf: number;
  exp: number;
  iss: string;
}

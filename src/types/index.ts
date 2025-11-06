import { PaletteMode } from "@mui/material";
import { Dayjs } from "dayjs";
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
export interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  minDate?: Dayjs;
  disablePast?: boolean;
}

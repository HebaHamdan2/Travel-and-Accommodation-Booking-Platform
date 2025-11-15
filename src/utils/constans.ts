import { ThemeContextType } from "../types";
export const baseURL = "https://hotel.foothilltech.net";
export const LOGO_URL ="/Home/Logo.svg";
export const initialThemeVlaue: ThemeContextType = {
  mode: "light",
  toggleMode: () => {},
};
export const adultsOptions = Array.from({ length: 8 }, (_, i) => i + 1);
export const childrenOptions = Array.from({ length: 6 }, (_, i) => i);
export const roomsOptions = Array.from({ length: 5 }, (_, i) => i + 1);
export const HOTEL_TYPE_LABELS: Record<number, string> = {
  0: "Boutique",
  1: "Resort",
  2: "Budget",
};

import { ThemeContextType } from "../types";
export const baseURL = "https://hotel.foothilltech.net";
export const LOGO_URL = "/Home/Logo.svg";
export const ROUTES = {
  LOGIN: "/login",
  HOME: "/home",
  SEARCH_RESULTS: "/search-results",
  HOTEL: (id: number) => `/hotels/${id}`,
  CHECKOUT: "/checkout",
  ADMIN: {
    ROOT: "/admin",
    MANAGE_CITIES: "/admin/manage-cities",
    MANAGE_HOTELS: "/admin/manage-hotels",
    MANAGE_ROOMS: "/admin/manage-rooms",
  },
  UNAUTHORIZED: "/unauthorized",
};
//endpoints need authentication
export const AUTH_REQUIRED_ENDPOINTS = [
  "getRecentlyVisited",
  "getBooking",
  "createBooking",
  "adminNavigationApi",
  "addCity",
  "deleteCity",
  "updateCity",
  "adminhotelsApi",
  "addHotelByCityId",
  "deleteHotelByCityId",
  "updateHotel",
  "updateRoom",
  "addHotelRoom",
  "deleteHotelRoom",
];
export const adultsOptions = Array.from({ length: 8 }, (_, i) => i + 1);
export const childrenOptions = Array.from({ length: 6 }, (_, i) => i);
export const roomsOptions = Array.from({ length: 5 }, (_, i) => i + 1);
export const ERROR_MESSAGES: Record<number | "default", string> = {
  400: "Bad request. Please check your input.",
  401: "Unauthorized. Please log in again.",
  403: "You are not authorized to perform this action.",
  404: "Resource not found.",
  500: "Server error. Please try again later.",
  default: "An unexpected error occurred. Please try again.",
};
export const initialThemeVlaue: ThemeContextType = {
  mode: "light",
  toggleMode: () => {},
};

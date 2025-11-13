import { PaletteMode } from "@mui/material";
import { ReactNode } from "react";
export type UserRole = "User" | "Admin" | null;

export interface LayoutProps {
  allowedRoles: UserRole[];
}
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
export interface Amenity {
  name: string;
  description: string;
}
export interface Hotel {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: Amenity[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: number;
}
export interface Gallery {
  id: number;
  url: string;
}
export interface AvailbleRoomQuery {
  hotelId: number;
  checkInDate: string;
  CheckOutDate: string;
}
export interface AvailbleRoom {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Amenity[];
  price: number;
  availability: boolean;
}
export interface Review {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
}

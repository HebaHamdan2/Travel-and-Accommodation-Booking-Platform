import { UserDetailsFormValues } from "../../pages/Checkout/types";
import { SearchRes } from "../../pages/Home/types";
import { AvailbleRoom, UserRole } from "../../types";

export interface AuthState {
  userType: UserRole;
  authentication: string | null;
  loading: boolean;
  error?: { title: string } | null;
}
export interface SearchState {
  city?: string;
  checkInDate: string;
  checkOutDate: string;
  starRate?: number;
  numberOfRooms: number;
  adults: number;
  children: number;
}
export interface SearchSliceState extends SearchState {
  results: SearchRes[];
  loading: boolean;
  error: string | null;
}
export interface FiltersState {
  priceRange: number[];
  rating: number | null;
  amenities: string[];
  roomTypes: string[];
}
export type CartRoomItem = Pick<
  AvailbleRoom,
  "roomId" | "roomNumber" | "roomType" | "roomPhotoUrl" | "price"
>;
export interface CartItem {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: CartRoomItem[];
  totalPrice: number;
}
export interface BookingState {
  userDetails: UserDetailsFormValues;
  cartItem: CartItem;
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  confirmationNumber?: string;
}
export type NotificationType = "error" | "success" | "warning" | "info";

export interface NotificationState {
  message: string | null;
  type: NotificationType | null;
}

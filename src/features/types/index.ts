import { UserDetailsFormValues } from "../../pages/Checkout/types";
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
  results: any[];
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

export interface CartState {
  items: CartItem[];
}

export interface BookingState {
  userDetails: UserDetailsFormValues;
  cartItems: CartItem[];
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  confirmationNumber?: string;
}

export interface BookingRequest {
  roomNumber: string;
  customerName: string;
  hotelName: string;
  roomType: string;
  totalCost: number;
  paymentMethod: string;
  bookingDateTime: string;
  id?: string;
}

export interface BookingResponse {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod: string;
  bookingStatus: string;
  confirmationNumber: string;
}

import dayjs from "dayjs";
import { AuthState, SearchState,SearchSliceState, CartState, BookingState, FiltersState } from "../types";

export const initialAuth: AuthState = {
  userType: null,
  authentication: null,
  loading: false,
  error: null,
};
const today = dayjs().startOf("day").format("YYYY-MM-DD");
const tomorrow = dayjs().add(1, "day").startOf("day").format("YYYY-MM-DD");

export const initialSearch: SearchState = {
  city: "",
  checkInDate: today,
  checkOutDate: tomorrow,
  starRate: undefined,
  numberOfRooms: 1,
  adults: 2,
  children: 0,
};
export const initialSearchState: SearchSliceState = {
  ...initialSearch,
  results: [],
  loading: false,
  error: null,
};
export const initialFilterState: FiltersState = {
  priceRange: [0, 500],
  rating: null,
  amenities: [],
  roomTypes: [],
};
export const initialCartState:CartState={
    items:[],
}
export const BookingInitialState: BookingState = {
  userDetails: {
    fullName: "",
    email: "",
    paymentMethod: "credit_card",
  },
  cartItems: [],
  status: "idle",
  error: undefined,
  confirmationNumber: undefined,
};
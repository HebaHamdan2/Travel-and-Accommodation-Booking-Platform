import dayjs from "dayjs";
import { AuthState, SearchState,SearchSliceState, CartState, BookingState, FiltersState, NotificationState } from "../types";

export const initialAuth: AuthState = {
  userType: null,
  authentication: null,
  loading: false,
  error: null,
};
export const DEFAUL_CHECKENDATE = dayjs().startOf("day").format("YYYY-MM-DD");
export const DEFAULT_CHECKOUTDATE = dayjs().add(1, "day").startOf("day").format("YYYY-MM-DD");

export const initialSearch: SearchState = {
  city: "",
  checkInDate: DEFAUL_CHECKENDATE,
  checkOutDate: DEFAULT_CHECKOUTDATE,
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

export const NotifcationInitialState: NotificationState = {
  message: null,
  type: null,
};

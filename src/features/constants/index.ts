import dayjs from "dayjs";
import { AuthState, SearchState } from "../types";

export const initialAuth: AuthState = {
  userType: null,
  authentication: null,
  loading: false,
  error: null,
};
const today = dayjs().startOf("day").format("YYYY/MM/DD");
const tomorrow = dayjs().add(1, "day").startOf("day").format("YYYY/MM/DD");

export const initialSearch: SearchState = {
  city: "",
  checkInDate: today,
  checkOutDate: tomorrow,
  starRate: undefined,
  numberOfRooms: 1,
  adults: 2,
  children: 0,
};

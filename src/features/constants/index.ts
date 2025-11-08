import dayjs from "dayjs";
import { AuthState, SearchState } from "../types";

export const initialAuth: AuthState = {
  userType: null,
  authentication: null,
  loading: false,
  error:null
};
const today = dayjs().startOf("day");
const tomorrow = dayjs().add(1, "day").startOf("day");

export const initialSearch: SearchState = {
  location: "",
  checkIn: today,
  checkOut: tomorrow,
  adults: 2,
  children: 0,
  rooms: 1,
};
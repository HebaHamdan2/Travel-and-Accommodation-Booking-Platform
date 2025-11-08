import { Dayjs } from "dayjs";

export interface AuthState {
  userType: string | null;
  authentication: string | null;
  loading: boolean;
  error?: { title: string } | null;
}
export interface SearchState {
  location: string;
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  adults: number;
  children: number;
  rooms: number;
}
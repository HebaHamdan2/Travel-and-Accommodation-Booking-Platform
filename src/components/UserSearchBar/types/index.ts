import { SearchParams } from "@/types";

export interface DateRangePickersProps {
  checkIn: string;
  checkOut: string;
  update: <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) => void;
}
export interface GuestSelectorsProps {
  adults: number;
  children: number;
  rooms: number;
  update: (key: keyof SearchParams, value: number) => void;
}
export interface SearchButtonProps {
  loading: boolean;
  onSearch: () => void;
}
export interface SearchCityFieldProps {
  value: string;
  update: <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) => void;
}
export interface SelectFieldProps {
  label: string;
  value: number;
  list: number[];
  onChange: (value: number) => void;
}

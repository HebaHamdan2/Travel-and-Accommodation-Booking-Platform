import { SearchParams } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import dayjs from "dayjs";
export const getInitialSearchFromURL = (): SearchParams => {
  const params = new URLSearchParams(window.location.search);
  const today = dayjs();
  return {
    city: params.get("city") || "",
    checkInDate: params.get("checkInDate") || formatDate(today),
    checkOutDate: params.get("checkOutDate") || formatDate(today.add(1, "day")),
    adults: Number(params.get("adults")) || 1,
    children: Number(params.get("children")) || 0,
    numberOfRooms: Number(params.get("numberOfRooms")) || 1,
  };
};

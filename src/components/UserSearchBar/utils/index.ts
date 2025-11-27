import { initialSearchState } from "@/features/constants";
import { SearchParams } from "@/types";
export const getInitialSearchFromURL = (): SearchParams => {
  const params = new URLSearchParams(window.location.search);
  return {
    city: params.get("city") || "",
    checkInDate: params.get("checkInDate") || initialSearchState.checkInDate,
    checkOutDate: params.get("checkOutDate") || initialSearchState.checkOutDate,
    adults: Number(params.get("adults")) || initialSearchState.adults,
    children: Number(params.get("children")) || initialSearchState.children,
    numberOfRooms:
      Number(params.get("numberOfRooms")) || initialSearchState.numberOfRooms,
  };
};

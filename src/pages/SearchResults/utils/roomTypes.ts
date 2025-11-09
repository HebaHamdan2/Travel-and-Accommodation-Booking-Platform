// Retuerns list of room types for filtering
//from default list before search load & dynamic list from hotels search results
import type { SearchRes } from "../../Home/types";
export const getRoomTypes = (searchResults: SearchRes[] = []): string[] => {
  const defaultRoomTypes = ["Single", "Double", "King", "Suite", "Standard"];
  const dynamicRoomTypes = Array.from(
    new Set(searchResults.map((hotel) => hotel.roomType))
  );

  return Array.from(new Set([...defaultRoomTypes, ...dynamicRoomTypes]));
};

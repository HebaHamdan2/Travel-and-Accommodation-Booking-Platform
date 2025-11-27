import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SearchRes } from "../../pages/Home/types";
import { normalizeAmenityName } from "../../pages/SearchResults/utils/normalizeAmenity";
export const selectFilteredHotels = createSelector(
  [
    (state: RootState) => state.search.results,
    (state: RootState) => state.filters,
  ],
  (results, filters) => {
    if (!results) return [];

    return results.filter((hotel: SearchRes) => {
      const price = hotel.roomPrice;
      const rating = hotel.starRating || 0;
      const amenities = hotel.amenities || [];
      const roomType = hotel.roomType || "";

      const isInPriceRange =
        Number(price) >= filters.priceRange[0] &&
        Number(price) <= filters.priceRange[1];
      const meetsRating = !filters.rating || rating >= filters.rating;
      const hasAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.some((a) =>
          amenities?.some(
            (am) => normalizeAmenityName(am.name) === normalizeAmenityName(a)
          )
        );
      const matchesRoomType =
        filters.roomTypes.length === 0 || filters.roomTypes.includes(roomType);
      return isInPriceRange && meetsRating && hasAmenities && matchesRoomType;
    });
  }
);

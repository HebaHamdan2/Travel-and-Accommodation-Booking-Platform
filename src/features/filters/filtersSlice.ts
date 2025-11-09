import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialFilterState } from "../types";

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    toggleAmenity: (state, action: PayloadAction<string>) => {
      const amenity = action.payload;
      state.amenities = state.amenities.includes(amenity)
        ? state.amenities.filter((a) => a !== amenity)
        : [...state.amenities, amenity];
    },
    toggleRoomType: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      state.roomTypes = state.roomTypes.includes(type)
        ? state.roomTypes.filter((r) => r !== type)
        : [...state.roomTypes, type];
    },
    resetFilters: () => initialFilterState,
  },
});
export const {
  setPriceRange,
  setRating,
  toggleAmenity,
  toggleRoomType,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;

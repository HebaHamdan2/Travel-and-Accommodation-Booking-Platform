import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialSearch } from "../constants";
import { SearchState } from "../types";

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearch,
  reducers: {
    setSearchData: (state, action: PayloadAction<Partial<SearchState>>) => {
      return { ...state, ...action.payload };
    },
    resetSearch: () => initialSearch,
  },
});
export const { setSearchData, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;

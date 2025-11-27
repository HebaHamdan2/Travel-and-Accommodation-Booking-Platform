import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialSearchState } from "../constants";
import { SearchSliceState } from "../types";
import { SearchRes } from "../../pages/Home/types";

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSearchData: (
      state,
      action: PayloadAction<Partial<SearchSliceState>>
    ) => {
      return { ...state, ...action.payload };
    },
    fetchSearchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSearchSuccess: (state, action: PayloadAction<SearchRes[]>) => {
      state.loading = false;
      state.results = action.payload;
    },
    fetchSearchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSearch: () => initialSearchState,
  },
});
export const {
  setSearchData,
  fetchSearchStart,
  fetchSearchSuccess,
  fetchSearchFailure,
  resetSearch,
} = searchSlice.actions;
export default searchSlice.reducer;

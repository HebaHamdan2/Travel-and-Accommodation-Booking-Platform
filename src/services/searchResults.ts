import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
import { Amenity } from "../types";
import { createBaseQueryWithErrorHandler } from "./baseQueryWithErrorHandler";
const baseQuery = createBaseQueryWithErrorHandler(
  `${baseURL}/api/search-results`
);
export const searchResultsApi = createApi({
  reducerPath: "searchResultsApi",
  baseQuery,
  endpoints: (builder) => ({
    getAmenities: builder.query<Amenity[], void>({
      query: () => "amenities",
    }),
  }),
});
export const { useGetAmenitiesQuery } = searchResultsApi;

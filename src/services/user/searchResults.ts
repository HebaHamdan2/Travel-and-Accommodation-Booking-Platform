import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";
import { Amenity } from "../../types";
import { baseURL } from "../../utils/constans";
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

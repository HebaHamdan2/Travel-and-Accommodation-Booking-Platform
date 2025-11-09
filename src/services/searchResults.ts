import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
import { Amenity } from "../types";
export const searchResultsApi = createApi({
  reducerPath: "searchResultsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/api/search-results` }),
  endpoints: (builder) => ({
    getAmenities: builder.query<Amenity[], void>({
      query: () => "amenities",
    }),
  }),
});
export const { useGetAmenitiesQuery } = searchResultsApi;

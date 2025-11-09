import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
export interface Amenitie {
  name: string;
  description: string;
}
export const searchResultsApi = createApi({
  reducerPath: "searchResultsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/api/search-results` }),
  endpoints: (builder) => ({
    getAmenities: builder.query<Amenitie[], void>({
      query: () => "amenities",
    }),
  }),
});
export const { useGetAmenitiesQuery } = searchResultsApi;

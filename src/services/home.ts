import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
import { Deal, RecentHotels, SearchRes, TrendDes } from "../pages/Home/types";
import { SearchState } from "../features/types";
import { createBaseQueryWithErrorHandler } from "./baseQueryWithErrorHandler";

const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/home`); // to handle backend errors and add authentication to endpoints that need
export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery,
  endpoints: (builder) => ({
    getSearch: builder.query<SearchRes[], Partial<SearchState>>({
      query: (params) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null)
            query.append(key, String(value));
        });
        return `search?${query.toString()}`;
      },
    }),
    getFeaturedDeals: builder.query<Deal[], void>({
      query: () => `featured-deals`,
    }),
    getRecentlyVisited: builder.query<RecentHotels[], string>({
      query: (user_id) => `/users/${user_id}/recent-hotels`,
    }),
    getTrendingDest: builder.query<TrendDes[], void>({
      query: () => `destinations/trending`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFeaturedDealsQuery,
  useGetRecentlyVisitedQuery,
  useGetTrendingDestQuery,
  useGetSearchQuery,
  useLazyGetSearchQuery,
} = homeApi;

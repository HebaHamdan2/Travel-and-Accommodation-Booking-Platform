import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
import { Deal, RecentHotels, SearchRes, TrendDes } from "../pages/Home/types";
import type { RootState } from "../app/store";
import { baseQueryWithErrorHandler } from "./baseQueryWithErrorHandler";
import { SearchState } from "../features/types";
// Define a service using a base URL and expected endpoints
const homebaseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/api/home`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.authentication;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: baseQueryWithErrorHandler(homebaseQuery),
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
} = homeApi;

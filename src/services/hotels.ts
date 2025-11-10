import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
import {
  AvailbleRoom,
  AvailbleRoomQuery,
  Gallery,
  Hotel,
  Review,
} from "../types";
export const hotelsApi = createApi({
  reducerPath: "hotelsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/api/hotels` }),
  endpoints: (builder) => ({
    getHoetlDetails: builder.query<Hotel[], string>({
      query: (hoteldId) => `/${hoteldId}`,
    }),
    getHotelGallery: builder.query<Gallery[], string>({
      query: (hotelId) => `/${hotelId}/gallery`,
    }),
    getAvailableRooms: builder.query<AvailbleRoom[], AvailbleRoomQuery>({
      query: ({ hotelId, checkInDate, CheckOutDate }) =>
        `/${hotelId}/available-rooms?checkInDate=${checkInDate}&CheckOutDate=${CheckOutDate}`,
    }),
    getHotelReviews: builder.query<Review[], string>({
      query: (hotelId) => `${hotelId}/reviews`,
    }),
  }),
});

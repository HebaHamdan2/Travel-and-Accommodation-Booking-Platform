import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constans";
import {
  AvailbleRoom,
  AvailbleRoomQuery,
  Gallery,
  Hotel,
  Review,
} from "../types";
import { createBaseQueryWithErrorHandler } from "./baseQueryWithErrorHandler";
const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/hotels`);
export const hotelsApi = createApi({
  reducerPath: "hotelsApi",
  baseQuery,
  endpoints: (builder) => ({
    getHotelDetails: builder.query<Hotel, number>({
      query: (hoteldId) => `/${hoteldId}`,
    }),
    getHotelGallery: builder.query<Gallery[], number>({
      query: (hotelId) => `/${hotelId}/gallery`,
    }),
    getAvailableRooms: builder.query<AvailbleRoom[], AvailbleRoomQuery>({
      query: ({ hotelId, checkInDate, CheckOutDate }) =>
        `/${hotelId}/available-rooms?checkInDate=${checkInDate}&CheckOutDate=${CheckOutDate}`,
    }),
    getHotelReviews: builder.query<Review[], number>({
      query: (hotelId) => `${hotelId}/reviews`,
    }),
  }),
});
export const {
  useGetHotelDetailsQuery,
  useGetHotelGalleryQuery,
  useGetAvailableRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelsApi;

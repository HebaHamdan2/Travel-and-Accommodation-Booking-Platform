import { createApi } from "@reduxjs/toolkit/query/react";
import { BookingRequest, BookingResponse } from "../../features/types";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";
import { baseURL } from "../../utils/constans";

const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/bookings`);
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery,
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    getBooking: builder.query<BookingResponse, string>({
      query: (bookingId) => `/${bookingId}`,
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingQuery } = bookingApi;

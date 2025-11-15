import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/constans";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";
import {
  addHotelRoomResponse,
  AdminHotel,
  AvailbleRoom,
  QueryParams,
  RoomBodyRequest,
} from "../../types";
import { mockHotelsData } from "../../mock/adminHotels.mock";
import {
  DEFAUL_CHECKENDATE,
  DEFAULT_CHECKOUTDATE,
} from "../../features/constants";

const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/hotels`);
export const adminhotelsApi = createApi({
  reducerPath: "adminhotelsApi",
  baseQuery,
  tagTypes: ["AdminHotels"],
  endpoints: (builder) => ({
    getHotels: builder.query<AdminHotel[], QueryParams>({
      async queryFn(queryParams, _queryApi, _extraOptions, baseQuery) {
        const {
          name,
          searchQuery,
          pageSize = 10,
          pageNumber = 1,
        } = queryParams || {};
        const response = await baseQuery({
          url: `?name=${name ?? ""}&searchQuery=${
            searchQuery ?? ""
          }&pageSize=${pageSize}&pageNumber=${pageNumber}`,
          method: "GET",
        });
        if (response.error) {
          console.warn("GET /hotels failed, using mock data instead.");
          return { data: mockHotelsData };
        }
        return { data: response.data as AdminHotel[] };
      },

      providesTags: ["AdminHotels"],
    }),
    updateHotel: builder.mutation<
      void,
      { hotelId: number; hotel: Omit<AdminHotel, "id"> }
    >({
      query: ({ hotelId, hotel }) => ({
        url: `/${hotelId}`,
        method: "PUT",
        body: hotel,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["AdminHotels"],
    }),
    getHotelRooms: builder.query<
      AvailbleRoom[],
      { hotelId: number; checkInDate?: string; checkOutDate?: string }
    >({
      query: ({ hotelId }) =>
        `/${hotelId}/rooms?checkInDate=${DEFAUL_CHECKENDATE}&checkOutDate=${DEFAULT_CHECKOUTDATE}`,
    }),
    addHotelRoom: builder.mutation<
      addHotelRoomResponse,
      { hotelId: number; room: RoomBodyRequest }
    >({
      query: ({ hotelId, room }) => ({
        url: `/${hotelId}/rooms`,
        method: "POST",
        body: room,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["AdminHotels"],
    }),
    deleteHotelRoom: builder.mutation<
      void,
      { hotelId: number; roomId: number }
    >({
      query: ({ hotelId, roomId }) => ({
        url: `/${hotelId}/rooms/${roomId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["AdminHotels"],
    }),
  }),
});
export const {
  useGetHotelsQuery,
  useUpdateHotelMutation,
  useGetHotelRoomsQuery,
  useAddHotelRoomMutation,
  useDeleteHotelRoomMutation,
} = adminhotelsApi;

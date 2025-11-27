import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/constans";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";
import { AdminHotel, City, QueryParams } from "../../types";

const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/cities`);
export const citiesApi = createApi({
  reducerPath: "citiesApi",
  baseQuery,
  tagTypes: ["Cities"], // for cache
  endpoints: (builder) => ({
    getCities: builder.query<City[], QueryParams>({
      query: (params) => {
        const {
          name,
          searchQuery,
          pageSize = 10,
          pageNumber = 1,
        } = params || {};
        return `?name=${name ?? ""}&searchQuery=${
          searchQuery ?? ""
        }&pageSize=${pageSize}&pageNumber=${pageNumber}`;
      },
      providesTags: ["Cities"],
    }),
    addCity: builder.mutation<City, { name: string; description: string }>({
      query: (city) => ({
        url: "",
        method: "POST",
        body: city,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Cities"], // Refresh cities list after adding
    }),
    deleteCity: builder.mutation<void, number>({
      query: (cityId) => ({
        url: `/${cityId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cities"], // Refresh cities list after deleting
    }),
    updateCity: builder.mutation<
      void,
      { cityId: number; city: { name: string; description: string } }
    >({
      query: ({ cityId, city }) => ({
        url: `/${cityId}`,
        method: "PUT",
        body: city,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Cities"], // Refresh cities list after updating
    }),
    addHotelByCityId: builder.mutation<
      void,
      { cityId: number; hotel: Omit<AdminHotel, "id"> }
    >({
      query: ({ cityId, hotel }) => ({
        url: `/${cityId}/hotels`,
        method: "POST",
        body: hotel,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Cities"],
    }),
    deleteHotelByCityId: builder.mutation<
      void,
      { cityId: number; hotelId: number }
    >({
      query: ({ cityId, hotelId }) => ({
        url: `/${cityId}/hotels/${hotelId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Cities"],
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useAddCityMutation,
  useDeleteCityMutation,
  useUpdateCityMutation,
  useAddHotelByCityIdMutation,
  useDeleteHotelByCityIdMutation,
} = citiesApi;

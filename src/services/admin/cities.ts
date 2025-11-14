import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/constans";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";
import { City, CityParams } from "../../types";

const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/cities`);
export const citiesApi = createApi({
  reducerPath: "citiesApi",
  baseQuery,
  tagTypes: ["Cities"], // for cache 
  endpoints: (builder) => ({
    getCities: builder.query<City[], CityParams>({
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
          "Content-Type": "application/json-patch+json",
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
  }),
});

export const { useGetCitiesQuery, useAddCityMutation, useDeleteCityMutation } =
  citiesApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/constans";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";

const baseQuery = createBaseQueryWithErrorHandler(
  `${baseURL}/admin/navigation`
);
export const adminNavigationApi = createApi({
  reducerPath: "adminNavigationApi",
  baseQuery,
  endpoints: (builder) => ({
    getAdminNavigation: builder.query<string[], void>({
      query: () => "/",
    }),
  }),
});
export const { useGetAdminNavigationQuery } = adminNavigationApi;

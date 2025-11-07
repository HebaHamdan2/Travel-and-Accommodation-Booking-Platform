import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "../features/auth/authSlice";

export const baseQueryWithErrorHandler = (
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
) => {
  return async (args: string | FetchArgs, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);//Send the real HTTP request to the backend and wait for a response

    // Handle 401 Unauthorized
    if (result.error?.status === 401) {
      api.dispatch(logout());
    }

    return result;
  };
};

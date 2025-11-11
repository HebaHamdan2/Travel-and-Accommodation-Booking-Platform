import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { AUTH_REQUIRED_ENDPOINTS } from "../utils/authEndpoints";
import { RootState } from "../app/store";
import { handleApiError } from "../utils/apiErrorHandlers";
export const createBaseQueryWithErrorHandler = (baseUrl: string) => {
  const AuthBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
     const state = getState() as RootState;
    const token = state.auth?.authentication;
      if (token && AUTH_REQUIRED_ENDPOINTS.includes(endpoint)) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  const baseQueryWithErrorHandler: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await AuthBaseQuery(args, api, extraOptions);///Send the real HTTP request to the backend and wait for a response

    if (result.error) {
      handleApiError(result.error, args, api);
    }

    return result;
  };

  return baseQueryWithErrorHandler;
};

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../app/store";
import { handleApiError } from "../utils/apiErrorHandlers";
import { AUTH_REQUIRED_ENDPOINTS } from "../utils/constans";
import { showNotification } from "../features/notifications/notificationsSlice";

type ExtendedError = FetchBaseQueryError & {
  messageToShow?: string;
};

export const createBaseQueryWithErrorHandler = (
  baseUrl: string
): BaseQueryFn<string | FetchArgs, unknown, ExtendedError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth?.authentication;
      if (token && AUTH_REQUIRED_ENDPOINTS.includes(endpoint)) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const baseQueryWithErrorHandler: BaseQueryFn<
    string | FetchArgs,
    unknown,
    ExtendedError
  > = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === "PARSING_ERROR") {
      const message = "Server sent invalid response. Please try again later.";

      api.dispatch(
        showNotification({
          message,
          type: "error",
        })
      );

      return {
        error: {
          status: "PARSING_ERROR",
          originalStatus: result.error.originalStatus,
          data: result.error.data,
          error: result.error.error,
          messageToShow: message,
        },
      };
    }

    if (result.error) {
      const message = handleApiError(result.error, args, api);

      api.dispatch(
        showNotification({
          message: `${result.error?.status || "Error"} - ${message}`,
          type: "error",
        })
      );

      return {
        error: {
          ...result.error,
          messageToShow: message,
        },
      };
    }

    return { data: result.data as unknown };
  };

  return baseQueryWithErrorHandler;
};

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { performLogout } from "../features/auth/logoutHelper";
import { ERROR_MESSAGES } from "./constans";

export const handleApiError = (
  error: FetchBaseQueryError,
  args: any,
  api: any
) => {
  const status = error?.status as number | undefined;
  const data = (error as any)?.data;

  const backendMessage =
    typeof data?.message === "string" ? data.message : undefined;

  const fallbackMessage =
    ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ||
    ERROR_MESSAGES.default;

  const messageToShow = backendMessage || fallbackMessage;

  if (status === 401) {
    api.dispatch(performLogout());
  }

  return messageToShow;
};

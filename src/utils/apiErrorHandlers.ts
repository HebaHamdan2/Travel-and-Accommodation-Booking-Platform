import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ERROR_MESSAGES } from "./errorMessages";
import { performLogout } from "../features/auth/logoutHelper";

export const handleApiError = (
  error: FetchBaseQueryError,
  args: any,
  api: any
) => {
  const status = error?.status as number | undefined;
  const data = (error as any)?.data;

  const backendMessage =
    typeof data?.message === "string" ? data.message : undefined;

  const isGalleryRequest =
    typeof args === "object" && typeof args.url === "string"
      ? args.url.includes("/gallery")
      : false;
  if (isGalleryRequest) return;

  const fallbackMessage =
    ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ||
    ERROR_MESSAGES.default;

  const messageToShow = backendMessage || fallbackMessage; // return backend message if it string and good to display
  if (status === 401) {
    console.log(messageToShow); //toast
    api.dispatch(performLogout());
    return;
  }

  console.log(messageToShow); //toast

  console.error("API Error:", error);
};

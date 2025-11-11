import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout } from "../features/auth/authSlice";
import { ERROR_MESSAGES } from "./errorMessages";

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

  const messageToShow = backendMessage || fallbackMessage; // return backend error if it string
  if (status === 401) {
    console.log(messageToShow); //toast
    api.dispatch(logout());
    return;
  }

  console.log(messageToShow); //toast

  console.error("API Error:", error);
};

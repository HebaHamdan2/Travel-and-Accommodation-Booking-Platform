export const ERROR_MESSAGES: Record<number | "default", string> = {
  400: "Bad request. Please check your input.",
  401: "Unauthorized. Please log in again.",
  403: "You are not authorized to perform this action.",
  404: "Resource not found.",
  500: "Server error. Please try again later.",
  default: "An unexpected error occurred. Please try again.",
};

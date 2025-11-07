import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types";

export const getDecodedToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    return null;
  }
};

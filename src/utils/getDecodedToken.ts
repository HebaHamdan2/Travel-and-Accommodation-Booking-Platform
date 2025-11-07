import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types";
import { useAppSelector } from "../app/hooks";

export const getDecodedToken = (): DecodedToken | null => {
  const { authentication } = useAppSelector((state) => state?.auth);
  if (!authentication) return null;
  try {
    return jwtDecode<DecodedToken>(authentication);
  } catch (error) {
    return null;
  }
};

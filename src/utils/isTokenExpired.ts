import { getDecodedToken } from "./getDecodedToken";

export const isTokenExpired = (token: string): boolean => {
  const decoded = getDecodedToken(token);
  if (!decoded) return true;
  const now = Date.now() / 1000; // seconds
  return decoded.exp < now;
};
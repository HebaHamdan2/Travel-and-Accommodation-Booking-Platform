import { Middleware } from "@reduxjs/toolkit";
import { isTokenExpired } from "../utils/isTokenExpired";
import { performLogout } from "../features/auth/logoutHelper";
import { AppDispatch } from "../app/store";

export const checkTokenExpMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState() as any;
    const token = state.auth?.authentication;
    if (token && isTokenExpired(token)) {
   (store.dispatch as AppDispatch)(performLogout());
    }
    return result;
  };

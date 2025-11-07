import { Middleware } from "@reduxjs/toolkit";
import { isTokenExpired } from "../utils/isTokenExpired";
import { logout } from "../features/auth/authSlice";

export const checkTokenExpMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState() as any;
    const token = state.auth?.authentication;
    if (token && isTokenExpired(token)) {
      store.dispatch(logout());
    }
    return result;
  };

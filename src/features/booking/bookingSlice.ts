import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  CartItem } from "../types";
import { UserDetailsFormValues } from "../../pages/Checkout/types";
import { BookingInitialState } from "../constants";

const bookingSlice = createSlice({
  name: "booking",
  initialState: BookingInitialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetailsFormValues>) => {
      state.userDetails = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    bookingStart: (state) => {
      state.status = "loading";
      state.error = undefined;
    },
    bookingSuccess: (state, action: PayloadAction<string>) => {
      state.status = "success";
      state.confirmationNumber = action.payload;
    },
    bookingFailure: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.error = action.payload;
    },
    resetBooking: () => BookingInitialState,
  },
});

export const {
  setUserDetails,
  setCartItems,
  bookingStart,
  bookingSuccess,
  bookingFailure,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;

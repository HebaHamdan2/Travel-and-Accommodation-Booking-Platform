import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartRoomItem } from "../types";
import { initialCartState } from "../constants";
import { calculateNights, calculateRoomsTotal } from "../utils";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addRoomToCart: (
      state,
      action: PayloadAction<{
        hotelName: string;
        checkInDate: string;
        checkOutDate: string;
        room: CartRoomItem;
      }>
    ) => {
      const { hotelName, checkInDate, checkOutDate, room } = action.payload;
      const nights = calculateNights(checkInDate, checkOutDate);

      if (!state.hotelName) {
        // first room
        state.hotelName = hotelName;
        state.checkInDate = checkInDate;
        state.checkOutDate = checkOutDate;
        state.rooms = [room];
        state.totalPrice = calculateRoomsTotal([room], nights);
      } else {
        const roomExists = state.rooms.some(
          (r) => r.roomNumber === room.roomNumber
        );
        if (!roomExists) {
          state.rooms.push(room);
          state.totalPrice = calculateRoomsTotal(state.rooms, nights);
        }
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ hotelName: string; roomNumber: number }>
    ) => {
      const { roomNumber } = action.payload;

      state.rooms = state.rooms.filter((r) => r.roomNumber !== roomNumber); //remove room with this number from the cart

      const nights = calculateNights(state.checkInDate, state.checkOutDate);
      state.totalPrice = calculateRoomsTotal(state.rooms, nights);
    },
    clearCart: () => initialCartState,
  },
});
export const { addRoomToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

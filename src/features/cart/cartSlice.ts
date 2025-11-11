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

      let hotelItem = state.items.find((item) => item.hotelName === hotelName);

      if (!hotelItem) {
        // first room added from this item
        state.items.push({
          hotelName,
          checkInDate,
          checkOutDate,
          rooms: [room],
          totalPrice: calculateRoomsTotal([room], nights),
        });
      } else {
        const roomExists = hotelItem.rooms.some(
          (r) => r.roomNumber === room.roomNumber
        ); //already book this room (exists on the cart)
        if (!roomExists) {
          //only if not exists (already added) on the cart
          hotelItem.rooms.push(room);
          hotelItem.totalPrice = calculateRoomsTotal(hotelItem.rooms, nights);
        }
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ hotelName: string; roomNumber: number }>
    ) => {
      const { hotelName, roomNumber } = action.payload;
      const hotelItem = state.items.find(
        (item) => item.hotelName === hotelName
      );
      if (!hotelItem) return;

      hotelItem.rooms = hotelItem.rooms.filter(
        (r) => r.roomNumber !== roomNumber
      ); //remove room with this number from hotelItems

      if (hotelItem.rooms.length === 0) {
        //if the hotelItems empty "no rooms booked from it" then remove it
        state.items = state.items.filter(
          (item) => item.hotelName !== hotelName
        );
      } else {
        // still there is rooms booked from this hotel then recalculate the total price from this hotel after remove the room
        const nights = calculateNights(
          hotelItem.checkInDate,
          hotelItem.checkOutDate
        );
        hotelItem.totalPrice = calculateRoomsTotal(hotelItem.rooms, nights);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { addRoomToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

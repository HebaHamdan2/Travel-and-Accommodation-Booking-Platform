import { RootState } from "../../app/store";

export const selectTotalCost = (state: RootState) =>
  state.cart.rooms.reduce((total, item) => total + item.price, 0);

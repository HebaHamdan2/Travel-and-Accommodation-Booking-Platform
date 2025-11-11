import { RootState } from "../../app/store";

export const selectTotalCost = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
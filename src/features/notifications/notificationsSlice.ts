import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotifcationInitialState } from "../constants";
import { NotificationType } from "../types";
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: NotifcationInitialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type?: NotificationType;
      }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type ?? "error"; // default error
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;

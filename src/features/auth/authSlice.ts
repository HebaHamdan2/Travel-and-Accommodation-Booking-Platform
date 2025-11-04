import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../constants";
import { initialAuth } from "../constants";
import { LoginValues } from "../../types";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: LoginValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/authenticate`,
        values
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    logout: (state) => {
      state.userType = null;
      state.authentication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userType = action.payload.userType;
        state.authentication = action.payload.authentication;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {logout}=authSlice.actions;
export default authSlice.reducer;
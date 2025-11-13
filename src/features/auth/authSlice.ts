import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialAuth } from "../constants";
import { LoginValues } from "../../types";
import { baseURL } from "../../utils/constans";

export const login = createAsyncThunk(
  "auth/login",
  async (values: LoginValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/authenticate`,
        values
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { title: error.message }
        );
      }
      return rejectWithValue({ title: "Unexpected error occurred" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.authentication = action.payload;
    },
    logout: (state) => {
      state.authentication = null;
      state.userType = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userType = action.payload.userType;
        state.authentication = action.payload.authentication;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { title: string }) || {
          title: "Unknown error",
        };
      });
  },
});
export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "./Services";

const initialState = {
  user: [],
  token: null,
  statusCode: 0,
  message: null,
  isAuthenticated: false,
};

export const getUserInfo = createAsyncThunk(
  "login/getUserInfo",
  async ({ email, password }) => {
    const response = await services.login({
      email,
      password,
    });
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.message = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.message = "success";
        state.user = action.payload.body.user;
        state.token = action.payload.body.token;
        if (action.payload.statusCode === 200) {
          state.isAuthenticated = true;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = action.error.code;
      });
  },
});

export default loginSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "./Services";

const initialState = {
  data: [],
  statusCode: 0,
  message: null,
};

export const getHistoryInfo = createAsyncThunk(
  "History/Info",
  async ({ month_year, id_user }) => {
    const response = await services.historyData({ month_year, id_user });
    return response.data;
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryInfo.pending, (state) => {
        state.message = "loading";
      })
      .addCase(getHistoryInfo.fulfilled, (state, action) => {
        state.message = "success";
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.body;
      })
      .addCase(getHistoryInfo.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = action.error.code;
      });
  },
});

export default historySlice.reducer;

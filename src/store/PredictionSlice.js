import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "./Services";

const initialState = {
  data: [],
  statusCode: 0,
  message: null,
};

export const getPredictionInfo = createAsyncThunk(
  "Prediction/Info",
  async ({ month_year, id_user }) => {
    const response = await services.predictionData({ month_year, id_user });
    return response.data;
  }
);

export const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPredictionInfo.pending, (state) => {
        state.message = "loading";
      })
      .addCase(getPredictionInfo.fulfilled, (state, action) => {
        state.message = "success";
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.body;
      })
      .addCase(getPredictionInfo.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = action.error.code;
      });
  },
});

export default predictionSlice.reducer;

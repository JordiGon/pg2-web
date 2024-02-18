import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "./Services";

const initialState = {
  stations: [],
  statusCode: 0,
  message: null,
};

export const getStationAccess = createAsyncThunk(
  "get-access/getStationAccess",
  async (id) => {
    const response = await services.access(id);
    return response.data;
  }
);

export const accessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStationAccess.pending, (state) => {
        state.message = "loading";
      })
      .addCase(getStationAccess.fulfilled, (state, action) => {
        state.message = "success";
        state.stations = action.payload.body;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(getStationAccess.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = action.error.code;
      });
  },
});

export default accessSlice.reducer;

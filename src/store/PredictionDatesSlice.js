import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month_year: null,
};

const predictionDateSlice = createSlice({
  name: "predictionDate",
  initialState,
  reducers: {
    setPredictionDate: (state, action) => {
      state.month_year = action.payload;
    },
  },
});

export const { setPredictionDate } = predictionDateSlice.actions;
export default predictionDateSlice.reducer;

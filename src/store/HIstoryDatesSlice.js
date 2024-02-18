import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month_year: null,
};

const historyDateSlice = createSlice({
  name: "historyDate",
  initialState,
  reducers: {
    setHistoryDate: (state, action) => {
      state.month_year = action.payload;
    },
  },
});

export const { setHistoryDate } = historyDateSlice.actions;
export default historyDateSlice.reducer;

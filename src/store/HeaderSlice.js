import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTitle: "ERROR ACCESS",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
  },
});

export const { setHeaderTitle } = headerSlice.actions;
export default headerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
};

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = responsiveSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainData: [],
};

const lightningSlice = createSlice({
  name: "lightning",
  initialState: initialState,
  reducers: {
    getLightningDataByFilters: (state, action) => {
      state.mainData = action.payload;
    },
  },
});

export const { getLightningDataByFilters } = lightningSlice.actions;
export default lightningSlice.reducer;

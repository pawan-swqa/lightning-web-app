import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainData: [],
};

const lightningDatatableSlice = createSlice({
  name: "datatable",
  initialState: initialState,
  reducers: {
    getLightningDatatableByFilters: (state, action) => {
      state.mainData = action.payload;
    },
  },
});

export const { getLightningDatatableByFilters } = lightningDatatableSlice.actions;
export default lightningDatatableSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainData: {
    fromDate: "2022-06-09T15:44:04Z",
    todate: "2022-06-15T12:44:04Z",
    intensityFrom: "4",
    intensityTo: "12",
    isCloudToCloud: true,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setFilters: (state, action) => {
      state.mainData = action.payload;
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

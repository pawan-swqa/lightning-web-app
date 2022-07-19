import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainData: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState: initialState,
  reducers: {
    setGraphData: (state, action) => {
      state.mainData = action.payload;
    },
  },
});

export const { setGraphData } = graphSlice.actions;
export default graphSlice.reducer;

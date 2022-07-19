import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoader } = loadingSlice.actions;
export default loadingSlice.reducer;

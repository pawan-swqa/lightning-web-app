import { configureStore } from "@reduxjs/toolkit";
import lightningReducer from "./reducers/lightningReducer";
import filtersReducer from "./reducers/filtersReducer";

export const store = configureStore({
  reducer: {
    lightning: lightningReducer,
    filters: filtersReducer,
  },
});
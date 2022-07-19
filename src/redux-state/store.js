import { configureStore } from "@reduxjs/toolkit";
import lightningReducer from "./reducers/lightningReducer";
import filtersReducer from "./reducers/filtersReducer";
import datatableReducer from "./reducers/lightningDataTableReducer";
import loader from "./reducers/loaderReducer";
import graphData from "./reducers/graphReducer";

export const store = configureStore({
  reducer: {
    lightning: lightningReducer,
    filters: filtersReducer,
    datatable:datatableReducer,
    loader:loader,
    graph:graphData
  },
});
import { configureStore } from '@reduxjs/toolkit'
import lightningReducer from "./reducers/lightningReducer";
export const store = configureStore({
  reducer: {
      lightning:lightningReducer
  },
})
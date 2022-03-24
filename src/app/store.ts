import { configureStore } from "@reduxjs/toolkit";
import geolocationReducer from "../features/geolocation/geolocationSlice";

const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

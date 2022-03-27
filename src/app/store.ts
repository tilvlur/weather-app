import { configureStore } from "@reduxjs/toolkit";
import geolocationReducer from "../features/geolocation/geolocationSlice";
import geocodingReducer from "../features/geocoding/geocodingSlice";
import weatherReducer from "../features/weather/weatherSlice";

const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
    geocoding: geocodingReducer,
    weather: weatherReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

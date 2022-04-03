import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GeolocationState } from "./types";
import type { RootState, AppDispatch } from "../../app/store";
import { fetchUserCurrentGeo, getBrowserGeo } from "./api";

const initialState: GeolocationState = {
  status: "idle",
  fromBrowserStatus: "idle",
  fromWebStatus: "idle",
  source: "default",
  // Координаты Москвы по умолчанию, если автоматически определить не получилось
  lat: "55.75583",
  lon: "37.61778",
};

const getBrowserGeolocation = createAsyncThunk(
  "geolocation/getBrowserGeolocation",
  async () => {
    const response = await getBrowserGeo();
    const geolocation: Pick<GeolocationState, "lat" | "lon"> = {
      lat: response.coords.latitude.toString(),
      lon: response.coords.longitude.toString(),
    };
    return geolocation;
  },
);

const getGeolocationFromWeb = createAsyncThunk(
  "geolocation/getGeolocationFromWeb",
  async () => {
    const response = await fetchUserCurrentGeo();
    const geolocation: Pick<GeolocationState, "lat" | "lon"> = {
      lat: response.latitude.toString(),
      lon: response.longitude.toString(),
    };
    return geolocation;
  },
);

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrowserGeolocation.pending, (state) => {
        state.status = "loading";
        state.fromBrowserStatus = "loading";
      })
      .addCase(getBrowserGeolocation.fulfilled, (state, action) => {
        const { lat, lon } = action.payload;

        state.status = "succeeded";
        state.fromBrowserStatus = "succeeded";
        state.source = "browser";
        state.lat = lat;
        state.lon = lon;
      })
      .addCase(getBrowserGeolocation.rejected, (state) => {
        state.fromBrowserStatus = "failed";
      })
      .addCase(getGeolocationFromWeb.pending, (state) => {
        state.fromWebStatus = "loading";
      })
      .addCase(getGeolocationFromWeb.fulfilled, (state, action) => {
        const { lat, lon } = action.payload;

        state.status = "succeeded";
        state.fromWebStatus = "succeeded";
        state.source = "web";
        state.lat = lat;
        state.lon = lon;
      })
      .addCase(getGeolocationFromWeb.rejected, (state) => {
        state.status = "failed";
        state.fromWebStatus = "failed";
      });
  },
});

export default geolocationSlice.reducer;

export const getUserGeolocation =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    await dispatch(getBrowserGeolocation());
    if (getState().geolocation.fromBrowserStatus === "failed") {
      dispatch(getGeolocationFromWeb());
    }
  };

export const selectGeolocationStatus = (state: RootState) =>
  state.geolocation.status;

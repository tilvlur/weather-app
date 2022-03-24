import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserCurrentGeo, getBrowserGeo } from "../../api/geoApi";
import type { GeolocationState } from "./types";
import type { RootState } from "../../app/store";

const initialState: GeolocationState = {
  fromBrowserStatus: "idle",
  fromWebStatus: "idle",
  source: "default",
  lat: "55.5820947",
  lon: "37.1053565",
};

export const getBrowserGeolocation = createAsyncThunk(
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

export const getGeolocationFromWeb = createAsyncThunk(
  "geolocation/getGeolocationFromWeb",
  async () => {
    const response = await fetchUserCurrentGeo();
    const geolocation: Pick<GeolocationState, "lat" | "lon"> = {
      lat: response.lat.toString(),
      lon: response.lon.toString(),
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
        state.fromBrowserStatus = "loading";
      })
      .addCase(getBrowserGeolocation.fulfilled, (state, action) => {
        const { lat, lon } = action.payload;

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

        state.fromWebStatus = "succeeded";
        state.source = "web";
        state.lat = lat;
        state.lon = lon;
      })
      .addCase(getGeolocationFromWeb.rejected, (state) => {
        state.fromWebStatus = "failed";
      });
  },
});

export default geolocationSlice.reducer;

export const selectBrowserGeoStatus = (state: RootState) =>
  state.geolocation.fromBrowserStatus;

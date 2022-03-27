import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GeocodingState, UserSelectionItem } from "./types";
import type { GeocodingDALobj } from "./api/types";
import type { RootState } from "../../app/store";

const initialState: GeocodingState = {
  userSelection: null,
  savedPlaces: [],
};

const geocodingSlice = createSlice({
  name: "geocoding",
  initialState,
  reducers: {
    setUserSelectedLocation(state, action: PayloadAction<GeocodingDALobj>) {
      state.userSelection = action.payload;
    },
    saveSelectedLocation: {
      reducer(state, action: PayloadAction<UserSelectionItem>) {
        if (state.userSelection) state.savedPlaces.push(action.payload);
      },
      prepare(payload: GeocodingDALobj) {
        return {
          payload: {
            timestamp: new Date(),
            ...payload,
          },
        };
      },
    },
  },
});

export default geocodingSlice.reducer;

export const { setUserSelectedLocation, saveSelectedLocation } =
  geocodingSlice.actions;

export const selectUserSelection = (state: RootState) =>
  state.geocoding.userSelection;
export const selectSavedPlaces = (state: RootState) =>
  state.geocoding.savedPlaces;

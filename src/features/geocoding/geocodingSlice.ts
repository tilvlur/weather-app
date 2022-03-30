import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GeocodingState, UserSelectionItem } from "./types";
import type { GeocodingDALobj } from "./api/types";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchPlaces } from "./api";
import { PlaceNameForRender } from "./types";

const initialState: GeocodingState = {
  source: null,
  reverseQuery: "idle",
  userSelection: null,
  canSavePlace: false,
  savedPlaces: [],
};

// Проверяем, сохранено ли уже такое место
const canSavePlace = (state: GeocodingState): boolean => {
  if (!!state.userSelection && state.savedPlaces.length === 0) {
    return true;
  }

  return !state.savedPlaces.some((el) => el.id === state.userSelection?.id);
};

const reverseQuery = createAsyncThunk<
  GeocodingDALobj,
  { lat: string; lon: string }
>("geocoding/reverseQuery", async ({ lat, lon }) => {
  return fetchPlaces.reverse(Number(lat), Number(lon));
});

const geocodingSlice = createSlice({
  name: "geocoding",
  initialState,
  reducers: {
    setUserSelectedLocation(state, action: PayloadAction<GeocodingDALobj>) {
      state.source = "forward";
      state.userSelection = action.payload;
      if (canSavePlace(state)) state.canSavePlace = true;
    },
    saveSelectedPlace: {
      reducer(
        state,
        action: PayloadAction<
          Pick<
            UserSelectionItem,
            "timestamp" | "placeNameForRender" | "cityLink"
          >
        >,
      ) {
        if (state.canSavePlace) {
          const { timestamp, placeNameForRender, cityLink } = action.payload;
          const payload: UserSelectionItem = {
            timestamp,
            placeNameForRender,
            cityLink,
            ...state.userSelection,
          };
          state.savedPlaces.push(payload);
          state.canSavePlace = false;
        }
      },
      prepare(placeNameForRender: PlaceNameForRender, cityLink: string) {
        return {
          payload: {
            timestamp: new Date().toISOString(),
            placeNameForRender,
            cityLink,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reverseQuery.pending, (state) => {
        state.reverseQuery = "loading";
      })
      .addCase(reverseQuery.fulfilled, (state, action) => {
        state.source = "reverse";
        state.reverseQuery = "succeeded";
        state.userSelection = action.payload;
        if (canSavePlace(state)) state.canSavePlace = true;
      })
      .addCase(reverseQuery.rejected, (state) => {
        state.reverseQuery = "failed";
      });
  },
});

export default geocodingSlice.reducer;

export const { setUserSelectedLocation } = geocodingSlice.actions;
const { saveSelectedPlace } = geocodingSlice.actions;
export const savePlace =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { cityName, cityLink, state, country } = getState().weather;
    if (cityName && cityLink && country) {
      const placeNameForRender = { cityName, state, country, cityLink };
      dispatch(saveSelectedPlace(placeNameForRender, cityLink));
    }
  };

export const reverseGeolocationQuery =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { lat, lon } = getState().geolocation;
    dispatch(reverseQuery({ lat, lon }));
  };

export const selectCanSavePlace = (state: RootState) =>
  state.geocoding.canSavePlace;
export const selectSavedPlaces = (state: RootState) =>
  state.geocoding.savedPlaces;
export const selectUserSelection = (state: RootState) =>
  state.geocoding.userSelection;

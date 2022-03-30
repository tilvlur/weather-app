import { GeocodingDALobj } from "./api/types";

export interface PlaceNameForRender {
  cityName: string;
  state: string | null;
  country: string;
}

export interface UserSelectionItem extends Partial<GeocodingDALobj> {
  timestamp: string;
  placeNameForRender: PlaceNameForRender;
  cityLink: string;
}

type SavedPlaces = Array<UserSelectionItem>;

export interface GeocodingState {
  source: null | "reverse" | "forward";
  reverseQuery: "idle" | "loading" | "succeeded" | "failed";
  userSelection: null | GeocodingDALobj;
  canSavePlace: boolean;
  savedPlaces: SavedPlaces;
}

import { GeocodingDALobj } from "./api/types";

export interface UserSelectionItem extends Partial<GeocodingDALobj> {
  timestamp: string;
}

type SavedPlaces = Array<UserSelectionItem>;

export interface GeocodingState {
  source: null | "reverse" | "forward";
  reverseQuery: "idle" | "loading" | "succeeded" | "failed";
  userSelection: null | GeocodingDALobj;
  canSavePlace: boolean;
  savedPlaces: SavedPlaces;
}

import { GeocodingDALobj } from "./api/types";

export interface UserSelectionItem extends GeocodingDALobj {
  timestamp: Date;
}
type SavedPlaces = Array<UserSelectionItem>;

export interface GeocodingState {
  userSelection: null | GeocodingDALobj;
  savedPlaces: SavedPlaces;
}

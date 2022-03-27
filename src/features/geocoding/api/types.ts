export type GeocodingResponseForward = Array<{
  id: string;
  place_name: string;
  center: [longitude: number, latitude: number];
}>;

type PlaceType =
  | "country"
  | "region"
  | "postcode"
  | "district"
  | "place"
  | "locality"
  | "neighborhood"
  | "address"
  | "poi";

export type GeocodingResponseReverse = Array<{
  id: string;
  place_type: Array<PlaceType>;
  place_name: string;
  center: [longitude: number, latitude: number];
}>;

export interface GeocodingDALobj {
  id: string;
  placeName: string;
  lat: string;
  lon: string;
}

export type GeocodingDALout = Array<GeocodingDALobj>;

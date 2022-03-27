export type GeocodingResponse = Array<{
  id: string;
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

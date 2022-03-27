import axios, { AxiosResponse } from "axios";
import {
  GeocodingDALout,
  GeocodingResponseForward,
  GeocodingResponseReverse,
} from "./types";

const instance = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  timeout: 2000,
});

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function dataAccessLayerForward(
  response: GeocodingResponseForward,
): GeocodingDALout {
  return response.map((r) => ({
    id: r.id,
    placeName: r.place_name,
    lat: r.center[1].toString(),
    lon: r.center[0].toString(),
  }));
}

function dataAccessLayerReverse(
  response: GeocodingResponseReverse,
): GeocodingDALout {
  return response
    .filter((r) => r.place_type.some((el) => el === "place"))
    .map((r) => ({
      id: r.id,
      placeName: r.place_name,
      lat: r.center[1].toString(),
      lon: r.center[0].toString(),
    }));
}

export const fetchPlaces = {
  async forward(place: string) {
    try {
      const response: AxiosResponse<{ features: GeocodingResponseForward }> =
        await instance.get(
          `${place}.json?access_token=${ACCESS_TOKEN}&autocomplete=true`,
        );
      return dataAccessLayerForward(response.data.features);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return null;
    }
  },
  async reverse(lat: number, lon: number) {
    const response: AxiosResponse<{ features: GeocodingResponseReverse }> =
      await instance.get(`${lon},${lat}.json?access_token=${ACCESS_TOKEN}`);
    return dataAccessLayerReverse(response.data.features)[0];
  },
};

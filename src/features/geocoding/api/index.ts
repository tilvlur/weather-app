import axios, { AxiosResponse } from "axios";
import { GeocodingDALout, GeocodingResponse } from "./types";

const instance = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  timeout: 2000,
});

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function dataAccessLayer(response: GeocodingResponse): GeocodingDALout {
  return response.map((r) => ({
    id: r.id,
    placeName: r.place_name,
    lat: r.center[1].toString(),
    lon: r.center[0].toString(),
  }));
}

export const fetchPlaces = async (place: string) => {
  try {
    const response: AxiosResponse<{ features: GeocodingResponse }> =
      await instance.get(
        `${place}.json?access_token=${ACCESS_TOKEN}&autocomplete=true`,
      );
    return dataAccessLayer(response.data.features);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://ip-api.com/",
});

export const getBrowserGeo = () =>
  new Promise<GeolocationPosition>((res, rej) => {
    if ("geolocation" in navigator) {
      const geoSuccess = (position: GeolocationPosition) => {
        res(position);
      };
      const geoFailure = () => {
        rej();
      };
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 60000,
      };
      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoFailure,
        geoOptions,
      );
    }
  });

export const fetchUserCurrentGeo = () =>
  instance.get("json/?fields=country,city,lat,lon").then(
    (
      response: AxiosResponse<{
        country: string;
        city: string;
        lat: number;
        lon: number;
      }>,
    ) => response.data,
  );

import axios, { AxiosResponse } from "axios";

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

const instance = axios.create({
  baseURL: "http://ip-api.com/",
  timeout: 2000,
});

export const fetchUserCurrentGeo = async () => {
  const response: AxiosResponse<{
    country: string;
    city: string;
    lat: number;
    lon: number;
  }> = await instance.get("json/?fields=country,city,lat,lon");

  return response.data;
};

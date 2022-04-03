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
  baseURL: "https://api.ipgeolocation.io/ipgeo",
  timeout: 2000,
});

const params = {
  apiKey: `${process.env.REACT_APP_IPGEOLOCATION_API_KEY}`,
  fields: "geo",
  exclude:
    "continent_code,continent_name,zipcode,state_prov,district,country_code2,country_code3",
};
const path = `?apiKey=${params.apiKey}&fields=${params.fields}&excludes=${params.exclude}`;

export const fetchUserCurrentGeo = async () => {
  const response: AxiosResponse<{
    country_name: string;
    city: string;
    latitude: number;
    longitude: number;
  }> = await instance.get(path);

  return response.data;
};

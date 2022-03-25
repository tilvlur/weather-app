import axios, { AxiosResponse } from "axios";
import { WeatherDataResponse, WeatherGeoResponse } from "./types";

const instanceData = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 2000,
});

const instanceGeo = axios.create({
  baseURL: "http://api.openweathermap.org/geo/1.0/",
  timeout: 2000,
});

const API_KEY = "d18d0ac4fdbb6e74bddcbbbb61b9f1ff";

export const weatherApi = {
  getWeather(lat: string, lon: string) {
    return instanceData
      .get(
        `onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`,
      )
      .then((response: AxiosResponse<WeatherDataResponse>) => response.data);
  },

  getWeatherGeo(lat: string, lon: string) {
    return instanceGeo
      .get(`reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response: AxiosResponse<WeatherGeoResponse>) => response.data);
  },
};

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

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const api = {
  async getWeather(lat: string, lon: string) {
    const response: AxiosResponse<WeatherDataResponse> = await instanceData.get(
      `onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`,
    );
    // return .then((response: AxiosResponse<WeatherDataResponse>) => response.data);
    return response.data;
  },

  async getWeatherGeo(lat: string, lon: string) {
    const response: AxiosResponse<WeatherGeoResponse> = await instanceGeo.get(
      `reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    return response.data;
  },
};

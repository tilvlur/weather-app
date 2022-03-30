import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData, WeatherGeoData, WeatherState } from "./types";
import { convertUnixTimestamp } from "../../common/utils/convertUnixTimestamp";
import type { AppDispatch, RootState } from "../../app/store";
import { api } from "./api";

const initialState: WeatherState = {
  status: "idle",
  getWeatherStatus: "idle",
  getWeatherGeoStatus: "idle",
  cityName: null,
  cityLink: null,
  localCityName: {
    en: null,
    ru: null,
  },
  state: null,
  country: null,
  lat: null,
  lon: null,
  timezone: null,
  timezoneOffset: null,
  current: {
    time: null,
    temp: null,
    pressure: null,
    humidity: null,
    clouds: null,
    windSpeed: null,
    weatherDescription: {
      main: null,
      description: null,
      icon: null,
    },
  },
  hourly: [],
  daily: [],
};

const getWeatherData = createAsyncThunk<
  WeatherData,
  { lat: string; lon: string }
>("weather/getWeatherData", async ({ lat, lon }) => {
  const response = await api.getWeather(lat, lon);
  const weatherData: WeatherData = {
    lat: response.lat.toString(),
    lon: response.lon.toString(),
    timezone: response.timezone,
    timezoneOffset: response.timezone_offset.toString(),
    current: {
      time: convertUnixTimestamp(response.current.dt),
      temp: response.current.temp.toString(),
      pressure: response.current.pressure.toString(),
      humidity: response.current.humidity.toString(),
      clouds: response.current.clouds.toString(),
      windSpeed: response.current.wind_speed.toString(),
      weatherDescription: {
        main: response.current.weather[0].main,
        description: response.current.weather[0].description,
        icon: response.current.weather[0].icon,
      },
    },
    hourly: response.hourly.map((h) => ({
      time: convertUnixTimestamp(h.dt),
      temp: h.temp.toString(),
      pressure: h.pressure.toString(),
      humidity: h.humidity.toString(),
      clouds: h.clouds.toString(),
      windSpeed: h.wind_speed.toString(),
      weatherDescription: {
        main: h.weather[0].main,
        description: h.weather[0].description,
        icon: h.weather[0].icon,
      },
    })),
    daily: response.daily.map((d) => ({
      time: convertUnixTimestamp(d.dt),
      temp: {
        day: d.temp.day.toString(),
        min: d.temp.min.toString(),
        max: d.temp.max.toString(),
        night: d.temp.night.toString(),
        eve: d.temp.eve.toString(),
        morn: d.temp.morn.toString(),
      },
      pressure: d.pressure.toString(),
      humidity: d.humidity.toString(),
      windSpeed: d.wind_speed.toString(),
      weatherDescription: {
        main: d.weather[0].main,
        description: d.weather[0].description,
        icon: d.weather[0].icon,
      },
      clouds: d.clouds.toString(),
      pop: d.pop.toString(),
    })),
  };
  return weatherData;
});

const getWeatherGeoData = createAsyncThunk<
  WeatherGeoData,
  { lat: string; lon: string }
>("weather/getWeatherGeoData", async ({ lat, lon }) => {
  const response = await api.getWeatherGeo(lat, lon);
  const weatherGeoData: WeatherGeoData = {
    cityName: response[0].name,
    localCityName: {
      en: response[0].local_names.en,
      ru: response[0].local_names.ru,
    },
    state: response[0].state,
    country: response[0].country,
  };
  return weatherGeoData;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<WeatherState["status"]>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.getWeatherStatus = "loading";
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.getWeatherStatus = "succeeded";
        const { payload } = action;
        state.lat = payload.lat;
        state.lon = payload.lon;
        state.timezone = payload.timezone;
        state.timezoneOffset = payload.timezoneOffset;
        state.current = payload.current;
        state.hourly = payload.hourly;
        state.daily = payload.daily;
      })
      .addCase(getWeatherData.rejected, (state) => {
        state.getWeatherStatus = "failed";
      })
      .addCase(getWeatherGeoData.pending, (state) => {
        state.getWeatherGeoStatus = "loading";
      })
      .addCase(getWeatherGeoData.fulfilled, (state, action) => {
        state.getWeatherGeoStatus = "succeeded";
        const { payload } = action;
        state.cityName = payload.cityName;
        state.cityLink = payload.cityName
          ? payload.cityName.toLowerCase().replace(/\s/g, "-")
          : null;
        state.localCityName = payload.localCityName;
        state.state = payload.state;
        state.country = payload.country;
      })
      .addCase(getWeatherGeoData.rejected, (state) => {
        state.getWeatherGeoStatus = "failed";
      });
  },
});

export default weatherSlice.reducer;

const { setStatus } = weatherSlice.actions;

export const fetchWeatherData =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    let { lat, lon } = getState().geolocation;
    // Если пользователь выбирает город в поиске, то выводим данные по этому городу
    const { userSelection } = getState().geocoding;
    if (userSelection) {
      lat = userSelection.lat;
      lon = userSelection.lon;
    }

    dispatch(setStatus("loading"));
    try {
      await dispatch(getWeatherData({ lat, lon })).unwrap();
      await dispatch(getWeatherGeoData({ lat, lon })).unwrap();
      dispatch(setStatus("succeeded"));
    } catch {
      dispatch(setStatus("failed"));
    }
  };

export const selectWeatherStatus = (state: RootState) => state.weather.status;
export const selectWeather = (state: RootState) => state.weather;

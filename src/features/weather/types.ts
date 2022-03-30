type NullStr = null | string;
interface WeatherDescription {
  main: NullStr;
  description: NullStr;
  icon: NullStr;
}

export interface WeatherState {
  status: "idle" | "loading" | "succeeded" | "failed";
  getWeatherStatus: "idle" | "loading" | "succeeded" | "failed";
  getWeatherGeoStatus: "idle" | "loading" | "succeeded" | "failed";
  cityName: NullStr;
  cityLink: NullStr;
  localCityName: {
    en: NullStr;
    ru: NullStr;
  };
  state: NullStr;
  country: NullStr;
  lat: NullStr;
  lon: NullStr;
  timezone: NullStr;
  timezoneOffset: NullStr;
  current: {
    time: NullStr;
    temp: NullStr;
    pressure: NullStr;
    humidity: NullStr;
    clouds: NullStr;
    windSpeed: NullStr;
    weatherDescription: WeatherDescription;
  };
  hourly: Array<{
    time: NullStr;
    temp: NullStr;
    pressure: NullStr;
    humidity: NullStr;
    clouds: NullStr;
    windSpeed: NullStr;
    weatherDescription: WeatherDescription;
  }>;
  daily: Array<{
    time: NullStr;
    temp: {
      day: NullStr;
      min: NullStr;
      max: NullStr;
      night: NullStr;
      eve: NullStr;
      morn: NullStr;
    };
    pressure: NullStr;
    humidity: NullStr;
    windSpeed: NullStr;
    weatherDescription: WeatherDescription;
    clouds: NullStr;
    pop: NullStr;
  }>;
}

export interface WeatherData
  extends Omit<
    WeatherState,
    | "cityName"
    | "cityLink"
    | "localCityName"
    | "state"
    | "country"
    | "status"
    | "getWeatherStatus"
    | "getWeatherGeoStatus"
  > {}

export interface WeatherGeoData
  extends Pick<
    WeatherState,
    "cityName" | "localCityName" | "state" | "country"
  > {}

export interface GeolocationState {
  fromBrowserStatus: "idle" | "loading" | "succeeded" | "failed";
  fromWebStatus: "idle" | "loading" | "succeeded" | "failed";
  source: "default" | "browser" | "web";
  lat: string;
  lon: string;
}

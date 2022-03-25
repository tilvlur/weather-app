export interface GeolocationState {
  status: "idle" | "loading" | "succeeded" | "failed";
  fromBrowserStatus: "idle" | "loading" | "succeeded" | "failed";
  fromWebStatus: "idle" | "loading" | "succeeded" | "failed";
  source: "default" | "browser" | "web";
  lat: string;
  lon: string;
}

import MapGl, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CSSProperties, useState } from "react";
import WeatherIcon from "../WeatherIcon";
import s from "./Map.module.scss";

type WeatherIconType = string | null;

interface MapProps {
  lat: number;
  lon: number;
  zoom?: number;
  height?: number;
  styles?: CSSProperties;
  marker?: WeatherIconType;
  weather?: string | null;
  temp?: string | null;
  wind?: string | null;
}

function Map({
  lat,
  lon,
  zoom = 10,
  height = 700,
  marker,
  weather,
  temp,
  wind,
  styles: restStyles,
}: MapProps) {
  const styles = {
    height,
    ...restStyles,
  } as CSSProperties;

  const [showDescription, setShowDescription] = useState<boolean>(false);

  const showDescriptionHandle = () => {
    setShowDescription(!showDescription);
  };

  const iconSize = 45;
  const descriptionWidth = 120;
  const descriptionHeight = 90;

  const descriptionStyles = {
    width: descriptionWidth,
    height: descriptionHeight,
    top: -descriptionHeight - 10,
    left: (iconSize - descriptionWidth) / 2,
  } as CSSProperties;

  const canRenderDescription = weather && temp && wind && showDescription;
  const renderDescription = canRenderDescription ? (
    <div className={s.description} style={{ ...descriptionStyles }}>
      <div className={s.weather}>{weather}</div>
      <div className={s.temp}>Temp: {temp}°C</div>
      <div className={s.wind}>Wind: {wind}m/s</div>
    </div>
  ) : null;

  const renderMarker = marker ? (
    <Marker
      latitude={lat}
      longitude={lon}
      offset={[40, -40]}
      onClick={showDescriptionHandle}
    >
      {renderDescription}
      <div className={s.marker}>
        <WeatherIcon icon={marker} alt={marker} size={iconSize} border={1} />
      </div>
    </Marker>
  ) : null;

  return (
    <MapGl
      initialViewState={{
        latitude: lat,
        longitude: lon,
        zoom,
      }}
      scrollZoom={false}
      style={{ ...styles }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {renderMarker}
      <NavigationControl />
    </MapGl>
  );
}

export default Map;

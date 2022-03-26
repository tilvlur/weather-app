import MapGl from "react-map-gl";

function Map() {
  return (
    <div>
      <MapGl
        initialViewState={{
          latitude: 55.88917,
          longitude: 37.445,
          zoom: 10,
        }}
        style={{ width: 700, height: 700 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default Map;

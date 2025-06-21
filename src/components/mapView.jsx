import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const FitBounds = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(points) || points.length === 0) return;

    const bounds = L.latLngBounds(points.map((p) => [p.latitude, p.longitude]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);

  return null;
};

const MapView = ({ center, radius, results = [], hoveredIndex }) => {
  const defaultCenter = [20, 0];
  const zoom = center ? 8 : 2;

  const isResultsArray = Array.isArray(results) && results.length > 0;

  return (
    <MapContainer
      center={center || defaultCenter}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {center && (
        <>
          <Marker position={center} />
          {radius && <Circle center={center} radius={radius * 1000} />}
        </>
      )}

      {isResultsArray &&
        results.map((row, index) => (
          <Marker key={index} position={[row.latitude, row.longitude]}>
            <Tooltip>
              {row.company} ({row.latitude.toFixed(2)}, {row.longitude.toFixed(2)})
            </Tooltip>
          </Marker>
        ))}

      {isResultsArray && <FitBounds points={results} />}
    </MapContainer>
  );
};

export default MapView;

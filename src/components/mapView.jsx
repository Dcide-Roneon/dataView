import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import blue from "leaflet/dist/images/marker-icon.png";          // default Leaflet blue
import shadow from "leaflet/dist/images/marker-shadow.png";
import React from "react";

// a brighter red icon (feel free to swap for your own asset)
const red = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";

const defaultIcon = L.icon({
  iconUrl: blue,
  shadowUrl: shadow,
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
  shadowSize:   [41, 41],
});

const highlightIcon = L.icon({
  ...defaultIcon.options,
  iconUrl: red,
  iconSize: [30, 49],        // a touch bigger so it really pops
});


const FitBounds = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(points) || points.length === 0) return;

    const bounds = L.latLngBounds(points.map((p) => [p.latitude, p.longitude]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);

  return null;
};

const MapView = ({ 
  center, 
  radius, 
  results = [], 
  hoveredIndex 
}) => {
  const defaultCenter = [20, 0];
  const zoom = center ? 8 : 2;

  const markersRef= useRef([]);
  const setMarkerRef =(el, i) =>{
    if(el) markersRef.current[i] = el;
  }

  useEffect(() =>{
    if (hoveredIndex == null) return;
    const m = markersRef.current[hoveredIndex];
    if (m) m.openTooltip();
  }, [hoveredIndex]);
  
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
          <Marker 
            key={index} 
            position={[row.latitude, row.longitude]}
            icon={hoveredIndex === index? highlightIcon : defaultIcon}
            ref={(el) => setMarkerRef(el, index)}
          >
            <Tooltip>
              {row.company} 
            </Tooltip>
          </Marker>
        ))}

      {isResultsArray && <FitBounds points={results} />}
    </MapContainer>
  );
};

export default MapView;

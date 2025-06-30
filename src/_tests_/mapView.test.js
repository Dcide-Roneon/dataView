import React from "react";
import { render } from "@testing-library/react";
import MapView from "../components/mapView";

// Mock leaflet images so Jest doesn't choke on them
jest.mock('leaflet/dist/images/marker-icon.png',  () => 'marker-icon',  { virtual: true });
jest.mock('leaflet/dist/images/marker-shadow.png', () => 'marker-shadow', { virtual: true });

// Mock react-leaflet components and hooks used by MapView and its children
jest.mock("react-leaflet", () => {
  const React = require('react');
  return {
    MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
    TileLayer: () => <div data-testid="tile" />,
    Marker: ({ position, children }) => (
      <div data-testid="marker" data-lat={position[0]} data-lng={position[1]}>
        {children}
      </div>
    ),
    Circle: ({ center, radius }) => (
      <div
        data-testid="circle"
        data-lat={center[0]}
        data-lng={center[1]}
        data-radius={radius}
      />
    ),
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
    Tooltip: ({ children }) => <div data-testid="tooltip">{children}</div>,
    // Mock the useMap hook to return an object with mocked methods used in FitBounds
    useMap: () => ({
      fitBounds: jest.fn(),
      // Add any other map methods if your component calls them
    }),
  };
});

describe("MapView", () => {
  it("maps coordinates from the database onto the map", () => {
    const radius = 1000;
    const results = [
      {
        capacity: 106,
        certifications: ["SOC-I", "PCI-DSS", "SOC-II", "ISO14001"],
        cloud_spend: 757057,
        company: "NimbusVault",
        contact_details: "contact@terralayer.com",
        dataCenter: "NorthDC",
        employee_count: 537,
        id: 1,
        industry: "Telecomms",
        intent_data: "Medium",
        latitude: 37.856343,
        longitude: -71.966865,
        use_cases: "AI Training",
      },
    ];

    const center = [results[0].latitude, results[0].longitude];

    const { getByTestId, getAllByTestId } = render(
      <MapView results={results} center={center} radius={radius} hoveredIndex={null} />
    );

    // Check the map container rendered
    const map = getByTestId("map");
    expect(map).toBeInTheDocument();

    // Check markers rendered with correct lat/lng attributes
    const markers = getAllByTestId("marker");
    expect(markers.length).toBe(2);
    expect(markers[0].getAttribute("data-lat")).toBe("37.856343");
    expect(markers[0].getAttribute("data-lng")).toBe("-71.966865");

    // Check circle rendered with correct radius
    const circle = getByTestId("circle");
    expect(circle).toHaveAttribute("data-radius", "1000000");
  });
});

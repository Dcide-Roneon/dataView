import { fetchFilteredLeads } from "../utils/api";
import { getDistanceFromLatLonInKm } from "../utils/distance";

jest.mock("../utils/distance", () => ({
  getDistanceFromLatLonInKm: jest.fn(() => 0), // mock 0km distance
}));

beforeEach(() => {
  fetch.resetMocks();
});

describe("fetchFilteredLeads", () => {
  it("returns leads within the radius", async () => {
    const mockLead = {
      id: 1,
      company: "MockCorp",
      latitude: 40.7128,
      longitude: -74.0060,
      capacity: 100,
      certifications: ["ISO27001"],
      industry: "Finance",
    };

    fetch.mockResponseOnce(JSON.stringify([mockLead]));

    const form = {
      latitude: "40.7128",
      longitude: "-74.0060",
      radius: "10",
      company: "",
      dataCenter: "",
      certifications: [],
      mwCapacity: "",
      industry: "",
    };

    const results = await fetchFilteredLeads(form);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(getDistanceFromLatLonInKm).toHaveBeenCalled(); // confirm distance is called
    expect(results).toHaveLength(1);
    expect(results[0].company).toBe("MockCorp");
  });
});

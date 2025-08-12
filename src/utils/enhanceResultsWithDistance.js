import { getDistanceFromLatLonInKm } from "./distance";

const enhanceResultsWithDistance = (results, latitude, longitude) => {
  return results
    .map((r) => ({
      ...r,
      _distance: getDistanceFromLatLonInKm(latitude, longitude, r.latitude, r.longitude),
    }))
    .sort((a, b) => (a._distance ?? Infinity) - (b._distance ?? Infinity));
};

export default enhanceResultsWithDistance;

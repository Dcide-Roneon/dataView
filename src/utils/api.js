// src/api/leadsApi.js
import supabase from "./supabaseClient"; // optional if not using
import { getDistanceFromLatLonInKm } from "./distance";
import URL from "./xanoClient";

export async function fetchFilteredLeads(form) {
  if (!form.latitude || !form.longitude || !form.radius) {
    console.warn("Latitude, longitude and radius are required");
    return [];
  }

  const response = await fetch(URL);
  const data = await response.json();

  // Filter by radius
 const userLat = Number(form.latitude.trim());
const userLng = Number(form.longitude.trim());
const radius = Number(form.radius);


const leadsByDistance = data
  .map((lead) => {
    const lat = Number(lead.latitude);
    const lng = Number(lead.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      console.warn("Invalid coordinates for:", lead.company);
      return null;
    }

    const distance = getDistanceFromLatLonInKm(userLat, userLng, lat, lng);
    return {
      ...lead,
      _distance: distance,
    };
  })
  .filter((lead) => {
    const isWithin = lead._distance <= radius;
    console.log(`${lead.company} is ${lead._distance.toFixed(2)} km — ${isWithin ? "✅ MATCH" : "❌ Too far"}`);
    return isWithin;
  });

console.log("Final matches:", leadsByDistance);
  //OPTIONAL FIELDS 
  const finalMatches = leadsByDistance.filter((lead) => {
    if (typeof lead._distance !== "number") {
      console.warn(`Invalid _distance for ${lead.company}:`, lead._distance);
}

    return (
      (!form.company || lead.company?.toLowerCase() === form.company?.trim().toLowerCase()) &&
      (!form.dataCenter || lead.dataCenter?.toLowerCase() === form.dataCenter?.trim().toLowerCase()) &&
      (!form.certifications || lead.certifications?.toLowerCase().includes(form.certifications?.trim().toLowerCase())) &&
      (!form.mwCapacity || Number(lead.capacity) === Number(form.mwCapacity.trim())) &&
      (!form.industry || lead.industry?.toLowerCase() === form.industry?.trim().toLowerCase())
    );
  });
  return finalMatches;
  
}

// src/api/leadsApi.js
import { getDistanceFromLatLonInKm } from "./distance";
import URL from "./xanoClient";

export async function fetchFilteredLeads(form) {
  const{
    latitude,
    longitude,
    radius, 
    company,
    dataCenter,
    certifications,
    mwCapacity,
    industry,
  } = form;
  console.log(latitude, longitude, radius)
  if (!latitude || !longitude || !radius) {
    console.warn("Latitude, longitude and radius are required");
    return [];
  }
  

  const response = await fetch(URL);
  const data = await response.json();


  // Filter by radius
  const leadsByDistance = data.filter((lead) =>{
    const distance = getDistanceFromLatLonInKm(
      Number(latitude),
      Number(longitude),
      Number(lead.latitude),
      Number(lead.longitude)
    );
    lead._distance = distance;
    return distance <= Number(radius);
  });
  const formCerts = form.certifications;
  const filtered = leadsByDistance.filter(lead =>{
    const matchesCert=
      formCerts.length === 0 ||
      formCerts.some(cert => lead.certifications.includes(cert));

      return(
        matchesCert &&
        (!form.company || lead.company?.toLowerCase() === form.company?.trim().toLowerCase()) &&
        (!form.dataCenter || lead.dataCenter?.toLowerCase() === form.dataCenter?.trim().toLowerCase()) &&
        (!form.mwCapacity || Number(lead.capacity) === Number(form.mwCapacity.trim())) &&
        (!form.industry || lead.industry?.toLowerCase() === form.industry?.trim().toLowerCase())

      );
   });

  const sorted = filtered.sort((a,b) => {
      const aMatches = formCerts.filter(cert => a.certifications.includes(cert)).length;
      const bMatches = formCerts.filter(cert=> b.certifications.includes(cert)).length;
      return bMatches - aMatches
  });
  return sorted;
}

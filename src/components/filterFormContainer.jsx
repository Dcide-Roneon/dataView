import React, { useState } from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  isValidCapacity,
  isValidLatitude,
  isValidLongitude,
} from "../utils/validation.js";
import FilterForm from "./filterForm.jsx";
import LinearWithValueLabel from "./loading.jsx";
import ResultsList from "./resultList.jsx";
import MapView from "./mapView.jsx";
import { Button, Box } from "@mui/material";
import { fetchFilteredLeads } from "../utils/api.js";
import FilterPanel from "./filterPanel.jsx";

const initialFormState = {
  company: "",
  dataCenter: "",
  latlng: "",
  radius: "",
  mwCapacity: "",
  certifications: [],
  industry: "",
};

const FilterFormContainer = () => {
  const [form, setForm] = useState(initialFormState);
  const [submittedForm, setSubmittedForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [radiusKm, setRadiusKm] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const resultsLimit = 3;

  const handleReset = () => {
    setForm(initialFormState);
    setSubmittedForm(null);
    setErrors({});
    setResults([]);
    setSearchDone(false);
    setUserLat(null);
    setUserLng(null);
    setRadiusKm(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const latLngPart = form.latlng.trim().split(/[\s,]+/);
    const latitude = parseFloat(latLngPart[0]);
    const longitude = parseFloat(latLngPart[1]);

    setUserLat(latitude);
    setUserLng(longitude);
    setRadiusKm(Number(form.radius));

    if (latLngPart.length !== 2 || isNaN(latitude) || isNaN(longitude)) {
      newErrors.latlng = "Enter Valid Coordinates";
    }

    if (!form.radius || isNaN(form.radius) || Number(form.radius) <= 0) {
      newErrors.radius = "Radius must be a positive number.";
    }

    if (form.mwCapacity && !isValidCapacity(form.mwCapacity)) {
      newErrors.mwCapacity = "MW Capacity must be a positive number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const matches = await fetchFilteredLeads({ ...form, latitude, longitude });
      console.log("matches found:", matches);
      setSubmittedForm({ ...form });
      setResults(matches);
      setSearchDone(true);
    } catch (err) {
      console.error("search error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (updatedForm) => {
    setForm(updatedForm);
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', padding: 2 }}>
      {/* Reset Button */}
      <Box display="flex" justifyContent="flex-end">
        {searchDone && (
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{ mt: 2, color: 'black', backgroundColor: 'whitesmoke' }}
          >
            Reset
          </Button>
        )}
      </Box>

      {/* Initial Form */}
      {!searchDone && (
        <FilterForm
          form={form}
          errors={errors}
          onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            setErrors({ ...errors, [e.target.name]: "" });
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* Main Layout: Always Rendered */}
      <Box display="flex" gap={2} mt={2} sx={{ height: 'calc(100vh - 100px)', px: 2 }}>
        {/* Filter Panel (left) */}
        {searchDone && (
          <Box
            sx={{
              width: 300,
              bgcolor: '#f9f9f9',
              borderRadius: 2,
              overflowY: 'auto',
              boxShadow: 1,
              height: '100%',
              padding: 3,
              ml: 2,
            }}
          >
            <FilterPanel
              values={form}
              onChange={handleFilterChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </Box>
        )}

        {/* ✅ MapView (center) */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#eef4f8',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 1,
            height: '100%',
          }}
        >
          <MapView
            center={searchDone && userLat && userLng ? [userLat, userLng] : null}
            radius={searchDone ? radiusKm : null}
            results={searchDone ? results.slice(0, resultsLimit) : []}
            hoveredIndex={hoveredIndex}
          />
        </Box>

        {/* Results Panel*/}
        {searchDone && (
          <Box
            sx={{
              width: 350,
              bgcolor: '#ffffff',
              p: 2,
              borderRadius: 2,
              overflowY: 'auto',
              boxShadow: 1,
              height: '100%',
            }}
          >
            <ResultsList
              results={results.slice(0, resultsLimit)}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </Box>
        )}
      </Box>

      {/* Loader */ }
      {isLoading && (
        <Box mt={4}>
          <LinearWithValueLabel />
        </Box>
      )}
    </Box>
  );
};

export default FilterFormContainer;

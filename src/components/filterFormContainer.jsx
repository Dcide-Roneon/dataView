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
  const [form, setForm] = useState(initialFormState);           // current input values
  const [submittedForm, setSubmittedForm] = useState(null);     // last submitted snapshot
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  const handleReset = () => {
    setForm(initialFormState);
    setSubmittedForm(null);
    setErrors({});
    setResults([]);
    setSearchDone(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const latLngPart = form.latlng.trim().split(/[\s,]+/);
    const latitude = parseFloat(latLngPart[0]);
    const longitude = parseFloat(latLngPart[1]);

    setUserLat(latitude);
    setUserLng(longitude);

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
      setSubmittedForm({ ...form });  // store snapshot
      setResults(matches);
      setSearchDone(true);
    } catch (err) {
      console.error("search error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (updatedForm) => {
    setForm(updatedForm);  // this updates inputs, but NOT the results
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', padding: 2 }}>
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

      {!searchDone ? (
        <FilterForm
          form={form}
          errors={errors}
          onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            setErrors({ ...errors, [e.target.name]: "" });
          }}
          onSubmit={handleSubmit}
        />
      ) : (
        <Box display="flex" gap={2} mt={2} sx={{ height: 'calc(100vh - 100px)', px: 2 }}>
          {/* Sidebar Panel */}
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

          {/* Results Panel */}
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: '#ffffff',
              p: 2,
              borderRadius: 2,
              overflowY: 'auto',
              boxShadow: 1,
              height: '100%',
            }}
          >
            <ResultsList results={results} userLat={userLat} userLng={userLng} />
          </Box>
        </Box>
      )}

      {isLoading && (
        <Box mt={4}>
          <LinearWithValueLabel />
        </Box>
      )}
    </Box>
  );
};

export default FilterFormContainer;

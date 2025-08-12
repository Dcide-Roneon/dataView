import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  keyframes,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterForm from "./filterForm.jsx";
import FilterPanel from "./filterPanel.jsx";
import ResultsList from "./resultList.jsx";
import MapView from "./mapView.jsx";
import LinearWithValueLabel from "./loading.jsx";
import enhanceResultsWithDistance from "../utils/enhanceResultsWithDistance.js";

import { isValidCapacity } from "../utils/validation.js";
import { fetchFilteredLeads } from "../utils/api.js";

import styles from "../styles/FormContainer.module.css";

const initialFormState = {
  company: "",
  dataCenter: "",
  latlng: "",
  radius: "",
  mwCapacity: "",
  certifications: [],
  industry: "",
};

const FormContainer = () => {
  const [form, setForm] = useState(initialFormState);
  const [submittedForm, setSubmittedForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  const limitedResults = useMemo(() => results.slice(0,3), [results]);

  const handleReset = useCallback(() => {
    setForm(initialFormState);
    setSubmittedForm(null);
    setErrors({});
    setResults([]);
    setSearchDone(false);
    setUserLat(null);
    setUserLng(null);
  }, [initialFormState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const latLngPart = form.latlng.trim().split(/[\s,]+/);
    const latitude = parseFloat(latLngPart[0]);
    const longitude = parseFloat(latLngPart[1]);

    if (latLngPart.length!==2|| isNaN(latitude) || isNaN(longitude)){
      newErrors.latlng="Enter valid coordinates.";
    }else{
      setUserLat(latitude);
      setUserLng(longitude);
    }

    if (latLngPart.length !== 2 || isNaN(latitude) || isNaN(longitude)) {
      newErrors.latlng = "Enter valid coordinates.";
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
      const sorted = enhanceResultsWithDistance(matches, latitude, longitude);

      setSubmittedForm({ ...form });
      setResults(sorted);
      setSearchDone(true);
    } catch (err) {
      console.error("Search error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) =>{
    setForm((prev) => ({...prev,[e.target.name]: e.target.value}));
    setErrors((prev)=> ({...prev, [e.target.name]: ""}));
  };
  const handleFilterChange = useCallback((updatedForm) => {
    setForm((prevForm) => {
      const isEqual =
        Object.keys(updatedForm).length === Object.keys(prevForm).length&&
        Object.keys(updatedForm).every(
          (key) => updatedForm[key] === prevForm[key]
        );
      if(isEqual) return prevForm;

      return updatedForm;
    });
  }, []);

  return (
    <Box className={styles.container}>
      {searchDone && (
        <Box className={styles.sidebar}>
          <Box className={styles.sidebarInner}>
            <Box
              component="img"
              className={styles.logo}
              src="/DCIDE Final Logo_Transparent.png"
              alt="DCIDE Logo"
            />
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <FilterPanel
              values={form}
              onChange={handleFilterChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </Box>
        </Box>
      )}

      <Box className={styles.main}>
        {!searchDone && (
          <Box className={styles.preMapWrapper}>
            <Box className={styles.preMapBox}>
              <MapView center={null} radius={null} results={[]} hoveredIndex={null} />
            </Box>
          </Box>
        )}

        {!searchDone && (
          <FilterForm
            form={form}
            errors={errors}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        )}

        {searchDone && (
          <Box className={styles.postSearchWrapper}>
            <Box className={styles.mapPanel}>
              <MapView
                center={userLat && userLng ? [userLat, userLng] : null}
                radius={form.radius}
                results={limitedResults}
                hoveredIndex={hoveredIndex}
              />
            </Box>

            <Box className={styles.resultsPanel}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {results.length} {results.length === 1 ? "facility" : "facilities"} found
              </Typography>
              <ResultsList
                results={limitedResults}
                userLat={userLat}
                userLng={userLng}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            </Box>
          </Box>
        )}

        {isLoading && (
          <Box mt={2}>
            <LinearWithValueLabel />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FormContainer;

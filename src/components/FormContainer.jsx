import React, { useState, useEffect } from "react";
import {
  isValidCapacity,
  isValidLatitude,
  isValidLongitude,
} from "../utils/validation.js";
import Form from "./Form.jsx";
import LinearWithValueLabel from "./loading.jsx";
import ResultsList from "./resultList.jsx";
import { Button } from "@mui/material";
import {
  fetchFilteredLeads
} from "../utils/api.js";

const initialFormState = {
  company: "",
  dataCenter: "",
  latitude: "",
  longitude: "",
  radius: "",
  mwCapacity: "",
  certifications: "",
  industry: "",
};

const FormContainer = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
    setResults([]);
    setSearchDone(false);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};
    // Required fields
    if (!isValidLatitude(form.latitude)) {
      newErrors.latitude = "Latitude must be a number between -90 and 90.";
    }
    if (!isValidLongitude(form.longitude)) {
      newErrors.longitude = "Longitude must be a number between -180 and 180.";
    }
    if (!form.radius || isNaN(form.radius) || Number(form.radius) <= 0) {
      newErrors.radius = "Radius must be a positive number.";
    }

    // Optional field
    if (form.mwCapacity && !isValidCapacity(form.mwCapacity)) {
      newErrors.mwCapacity = "MW Capacity must be a positive number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Begin loading and filtering
    setErrors({});
    setIsLoading(true);
    setSearchDone(false);

  
        const matches = await fetchFilteredLeads(form);
        console.log("matches found:", matches);
        setResults(matches);
        setSearchDone(true);
        setIsLoading(false)
  };
  return (
    <>
      <Form
        form={form}
        errors={errors}
        onChange={(e)=>{
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
            setErrors({...errors, [e.target.name]: ""});
        }}
        onSubmit={handleSubmit}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        sx={{ mt: 2 }}
      >
        Reset
      </Button>

      {isLoading && (
        <div style={{ marginTop: "20px" }}>
          <LinearWithValueLabel />
        </div>
      )}

      {searchDone && !isLoading && (
        <ResultsList
          results={results}
          userLat={Number(form.latitude)}
          userLng={Number(form.longitude)}
        />
      )}
    </>
  );
};

export default FormContainer;

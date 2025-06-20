import React, { useState, useEffect } from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  isValidCapacity,
  isValidLatitude,
  isValidLongitude,
} from "../utils/validation.js";
import Form from "./Form.jsx";
import LinearWithValueLabel from "../components/loading.jsx";
import ResultsList from "../components/resultList.jsx";
import { Button } from "@mui/material";
import {
  fetchFilteredLeads
} from "../utils/api.js";

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
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLat, setUserLat]= useState(null);
  const [userLng, setUserLng] = useState(null);

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
    setResults([]);
    setSearchDone(false);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    const latLngPart= form.latlng.trim().split(/[\s,]+/);
    const latitude = parseFloat(latLngPart[0]);
    const longitude = parseFloat(latLngPart[1]);

    setUserLat(latitude);
    setUserLng(longitude);

    if (latLngPart.length !== 2 || isNaN(latitude) || isNaN(longitude)){
      newErrors.latlng="Enter Valid Coordinates";
    }
    
    // Required fields
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

  
    fetchFilteredLeads({...form, latitude, longitude})
      .then((matches)  => {
        console.log("matches found:", matches);
        setResults(matches);
        setSearchDone(true);
        

      })
      .catch((err) => {
        console.error("search error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
        
  }
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
        startIcon={<RestartAltIcon />}
        onClick={handleReset}
        sx={{ mt: 2,  color:'black', backgroundColor: 'whitesmoke',}}
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
          userLat={userLat}
          userLng={userLng}
        />
      )}
    </>
  );
};

export default FormContainer;

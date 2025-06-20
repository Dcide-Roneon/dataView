import { useState } from "react";
import { isValidCapacity } from "./validation.js";
import { fetchFilteredLeads } from "./api.js";

const initialFormState = {
  company: "",
  dataCenter: "",
  latlng: "",
  radius: "",
  mwCapacity: "",
  certifications: [],
  industry: "",
};

const useFilterLogic = () => {
  const [form, setForm] = useState(initialFormState);
  const [submittedForm, setSubmittedForm] = useState(null);
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
      setSubmittedForm({ ...form });
      setResults(matches);
      setSearchDone(true);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFilterChange = (updatedForm) => {
    setForm(updatedForm);
  };

  return {
    form,
    errors,
    results,
    searchDone,
    isLoading,
    userLat,
    userLng,
    handleSubmit,
    handleReset,
    handleChange,
    handleFilterChange
  };
};

export default useFilterLogic;

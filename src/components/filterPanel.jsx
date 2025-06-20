import React from "react";
import { Box, Typography, Chip, Divider, Button } from "@mui/material";
import FilterForm from "./filterForm";

const removableFields = [
  "company",
  "dataCenter",
  "mwCapacity",
  "certifications",
  "industry"
];

const FilterPanel = ({ values, onChange, onSubmit, onReset }) => {
  const handleRemoveChip = (field, chipValue = null) => {
    const newForm = { ...values };

    if (Array.isArray(values[field])) {
      newForm[field] = values[field].filter((item) => item !== chipValue);
    } else {
      newForm[field] = "";
    }

    onChange(newForm); // does NOT auto-submit
  };

  const renderChips = () => {
    return removableFields.flatMap((field) => {
      const val = values[field];
      if (!val || (Array.isArray(val) && val.length === 0)) return [];

      if (Array.isArray(val)) {
        return val.map((item) => (
          <Chip
            key={`${field}-${item}`}
            label={item}
            onDelete={() => handleRemoveChip(field, item)}
            sx={{ m: 0.5 }}
          />
        ));
      }

      return (
        <Chip
          key={field}
          label={`${field}: ${val}`}
          onDelete={() => handleRemoveChip(field)}
          sx={{ m: 0.5 }}
        />
      );
    });
  };

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" mb={2}>
        {renderChips()}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Sidebar version of FilterForm */}
      <FilterForm
        form={values}
        errors={{}} // optional: skip validation display here
        onChange={(e) =>
          onChange({
            ...values,
            [e.target.name]: e.target.value,
          })
        }
        onSubmit={onSubmit}
        isFilter={true} // optional prop to style it differently
      />

      <Button
        onClick={onSubmit}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Update Results
      </Button>

      <Button
        onClick={onReset}
        variant="text"
        fullWidth
        sx={{ mt: 1 }}
      >
        Reset Search
      </Button>
    </Box>
  );
};

export default FilterPanel;

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  Box,
  FormControl,
  OutlinedInput,
  Divider,
  InputAdornment,
} from "@mui/material";

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FactoryIcon from '@mui/icons-material/Factory';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';

const certOptions = [
  "ISO14001",
  "ISO22301",
  "PCI-DSS",
  "ISO50001",
  "ISO27001",
  "SOC-I",
  "SOC-II",
  "LEED",
];

const FilterForm = ({ form, errors, onChange, onSubmit, isFilter = false }) => {
  const [certFilter, setCertFilter] = useState("");

  const selectedCerts = Array.isArray(form.certifications)
    ? form.certifications
    : [];

  const filteredCerts = certOptions.filter((cert) =>
    cert.toLowerCase().includes(certFilter.toLowerCase())
  );

  const handleCertChange = (event) => {
    const { value } = event.target;
    onChange({
      target: {
        name: "certifications",
        value: typeof value === "string" ? value.split(",") : value,
      },
    });
  };

  const handleSelectAll = () => {
    if (selectedCerts.length === certOptions.length) {
      onChange({ target: { name: "certifications", value: [] } });
    } else {
      onChange({ target: { name: "certifications", value: certOptions } });
    }
  };

  return (
    <Box sx={{  p: 2 }}>
      <form onSubmit={onSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="company"
              value={form.company}
              onChange={onChange}
              fullWidth
              error={!!errors.company}
              helperText={errors.company}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Data Center Name"
              name="dataCenter"
              value={form.dataCenter}
              onChange={onChange}
              fullWidth
              error={!!errors.dataCenter}
              helperText={errors.dataCenter}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Latitude & Longitude"
              name="latlng"
              value={form.latlng}
              onChange={onChange}
              fullWidth
              placeholder="e.g. 40.7128,-74.0060 or 40.7128 -74.0060"
              required
              error={!!errors.latlng}
              helperText={errors.latlng}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Search Radius (km)"
              name="radius"
              type="number"
              value={form.radius}
              onChange={onChange}
              fullWidth
              error={!!errors.radius}
              helperText={errors.radius}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="MW Capacity"
              name="mwCapacity"
              value={form.mwCapacity}
              onChange={onChange}
              fullWidth
              type="number"
              error={!!errors.mwCapacity}
              helperText={errors.mwCapacity}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BatteryChargingFullIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="certifications-label">Certifications</InputLabel>
              <Select
                labelId="certifications-label"
                id="certifications"
                name="certifications"
                multiple
                value={selectedCerts}
                onChange={handleCertChange}
                input={
                  <OutlinedInput
                    label="Certifications"
                    startAdornment={
                      <InputAdornment position="start">
                        <WorkspacePremiumIcon />
                      </InputAdornment>
                    }
                  />
                }
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: { style: { maxHeight: 300, width: 300 } },
                }}
              >
                <MenuItem onClick={handleSelectAll}>
                  <Checkbox
                    checked={selectedCerts.length === certOptions.length}
                    indeterminate={
                      selectedCerts.length > 0 &&
                      selectedCerts.length < certOptions.length
                    }
                  />
                  <ListItemText
                    primary={
                      selectedCerts.length === certOptions.length
                        ? "Deselect All"
                        : "Select All"
                    }
                  />
                </MenuItem>
                <Divider />
                {filteredCerts.map((cert) => (
                  <MenuItem key={cert} value={cert}>
                    <Checkbox checked={selectedCerts.includes(cert)} />
                    <ListItemText primary={cert} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Select
              label="Industry"
              name="industry"
              id="industry"
              value={form.industry}
              onChange={onChange}
              fullWidth
              displayEmpty
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: "small" }}>
                  <FactoryIcon />
                  {selected || "Industry"}
                </Box>
              )}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Telecomms">Telecomms</MenuItem>
              <MenuItem value="Architecture & Planning">Architecture & Planning</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
            </Select>
          </Grid>

          {!isFilter && (
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                type="submit"
                startIcon={<AutoAwesomeIcon />}
                sx={{ backgroundColor: "#FAF9F6", color: "#0f56fc" }}
              >
                Generate Leads
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default FilterForm;

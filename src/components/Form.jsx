// Pure UI, no logic.
import React from "react";
import { Grid, TextField, Button, Select, MenuItem } from "@mui/material";

const Form = ({ form, errors, onChange, onSubmit }) => {
  return (
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Latitude"
            name="latitude"
            value={form.latitude}
            onChange={onChange}
            fullWidth
            required
            type="number"
            error={!!errors.latitude}
            helperText={errors.latitude}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Longitude"
            name="longitude"
            value={form.longitude}
            onChange={onChange}
            fullWidth
            required
            type="number"
            error={!!errors.longitude}
            helperText={errors.longitude}
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
            error={!errors.radius}
            helperText={errors.radius}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Certifications"
            name="certifications"
            value={form.certifications}
            onChange={onChange}
            fullWidth
            error={!!errors.certifications}
            helperText={errors.certifications}
          />
        </Grid>
        <Grid item xs={12}>
          <Select 
            label="industry"
            name="industry"
            id="industry"
            value={form.industry}
            onChange={onChange}
            fullWidth
            displayEmpty
            renderValue={(selected) => selected ? selected : "Industry"}
          >
            <MenuItem value=""> <em>None</em> </MenuItem>
            <MenuItem value="Telecomms"> Telecomms</MenuItem>
            <MenuItem value="Architecture & Planning">Architecture & Planning</MenuItem>
            <MenuItem value="Retail"> Retail </MenuItem>
            <MenuItem value="Finance"> Finance </MenuItem>
            <MenuItem value="Education">Education </MenuItem>
            <MenuItem value="Manufacturing"> Manufacturing</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Generate Leads
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default Form;

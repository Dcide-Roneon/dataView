// Pure UI, no logic.
import React, { useState }from "react";
import { Grid, TextField, Button, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl, OutlinedInput,Divider,} from "@mui/material";

const certOptions =[
  "ISO14001",
  "ISO22301",
  "PCI-DSS",
  "ISO50001",
  "ISO27001",
  "SOC-I",
  "SOC-II",
  "LEED",
  ];

const Form = ({ form, errors, onChange, onSubmit }) => {

  const[certFilter,setCertFilter] = useState("");

  const selectedCerts = Array.isArray(form.certifications)
    ?form.certifications
    : [];

  const filteredCerts =certOptions.filter((cert) => 
    cert.toLowerCase().includes(certFilter.toLowerCase())
  );
  const handleCertChange = (event) => {
    const { value } = event.target;
    onChange({
      target: {
        name: "certifications",
        value: typeof value === "string"? value.split(","): value,
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
            label="Latitude & Longitude"
            name="latlng"
            value={form.latlng}
            onChange={onChange}
            fullWidth
            placeholder="e.g. 40.7128,-74.0060 or 40.7128 -74.0060"
            required
            error={!!errors.latlng}
            helperText={errors.latlng}
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
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="certifications-label">Certifications</InputLabel>
          <Select
            labelId="certifications-label"
            id="certifications"
            name="certifications"
            multiple
            value={selectedCerts}
            onChange={handleCertChange}
            input={<OutlinedInput label="Certifications" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  width: 300,
                },
              },
            }}
          >
            <MenuItem disableRipple disableGutters>
              <TextField
                placeholder="Search..."
                value={certFilter}
                onChange={(e) => setCertFilter(e.target.value)}
                size="small"
                fullWidth
              />
            </MenuItem>

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

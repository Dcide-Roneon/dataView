import {Card, CardContent, Typography,  Chip, Stack, Box, Divider, Grid} from "@mui/material";
import React from "react";
import { getDistanceFromLatLonInKm } from "../utils/distance";
const formatNumber = (num) => {
  return Number(num).toLocaleString();
};
const ResultCard = ({ row,userLat, userLng} ) => {

    const distance = getDistanceFromLatLonInKm(
        Number (userLat),
        Number (userLng),
        Number(row.latitude),
        Number(row.longitude),
        console.log("user Lat/Long: ", userLat, userLng),
        console.log("Row lat/lng:", row.latitude, row.longitude),
        console.log("Parsed lat/lng:", Number(userLat), Number(userLng), Number(row.latitude), Number(row.longitude))

        
    );
    return (
   <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* TITLE & LOCATION */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {row.company}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {row.latitude}, {row.longitude}
          </Typography>
        </Box>

        {/* TWO-COLUMN CONTENT */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={4}
        >
          {/* LEFT COLUMN */}
          <Stack spacing={1} sx={{ flex: 1 }} alignItems={"flex-start"}>
            <Chip label={`Industry: ${row.industry || "N/A"}`} variant="outlined" />
          </Stack>

          {/* RIGHT COLUMN */}
          <Stack spacing={1} sx={{ flex: 1 }} alignItems="flex-end">
            <Typography variant="body2">
              Cloud/IT Spend: ${formatNumber(row.cloud_spend)}
            </Typography>
            <Chip label={`Use Case: ${row.use_cases || "N/A"}`} variant="outlined" />
            <Chip label="Bucket: Placeholder" variant="outlined" />
            <Chip label={`Employees: ${formatNumber(row.employee_count)}`} />
            <Chip label="Est. Revenue: Placeholder" variant="outlined" />
            <Typography variant="body2">
              Contact: {row.contact_details}
            </Typography>
          </Stack>
        </Stack>

        {/* DIVIDER */}
        <Divider sx={{ my: 2 }} />

        {/* DISTANCE CHIP */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Chip
            label={`Distance: ${row._distance?.toFixed(2)} km`}
            color="info"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
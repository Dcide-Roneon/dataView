import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import React from "react";
import { getDistanceFromLatLonInKm } from "../utils/distance";

const formatNumber = (num) => Number(num).toLocaleString();

const ResultCard = ({ row, total, hovered, onHover, onLeave }) => {
  const distance = getDistanceFromLatLonInKm(
    Number(row.latitude),
    Number(row.longitude)
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Card
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        sx={{
          backgroundColor: "white",
          border: hovered ? "2px solid #007BFF" : "1px solid #ccc",
          boxShadow: hovered ? 4 : 1,
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          width: '100%',
          maxWidth: 300,     
          mb:2
        }}
      >

        <CardContent sx={{
          transformOrigin: 'top left',
          padding: 1,
        }}>
          {/* TITLE & LOCATION */}
          <Box
            mb={.5}
            sx={{
              backgroundColor: "#222428",
              color: "white",
              borderRadius: 2,
              padding: .5,
              
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {row.company}
            </Typography>
            <Typography variant="body2" color="grey">
              {row.latitude}, {row.longitude}
            </Typography>
          </Box>

          {/* TWO-COLUMN CONTENT */}
          <Box sx={{           transform: 'scale(0.9)',}}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              {/*
                
                <Stack spacing={1} sx={{ flex: 1 }} alignItems={"flex-start"}>
                  <Chip
                    label={`Industry: ${row.industry || "N/A"}`}
                    variant="outlined"
                  />
                </Stack>
              */}
              {/* RIGHT COLUMN */}
              <Stack spacing={1} sx={{ flex: 1 }} alignItems="flex-end">
                <Chip
                  label={`Industry: ${row.industry || "N/A"}`}
                  variant="outlined"
                />
                <Chip
                  label={` Est. KW Requirement: ${row.capacity}`}
                  size="small"
                  sx={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              />
              <Typography variant="body2">
                Cloud/IT Spend: ${formatNumber(row.cloud_spend)}
              </Typography>
              <Chip
                label={`Use Case: ${row.use_cases || "N/A"}`}
                variant="outlined"
              />
              <Chip label="Bucket: Placeholder" variant="outlined" />
              <Chip label={`Employees: ${formatNumber(row.employee_count)}`} />
              <Chip label="Est. Revenue: Placeholder" variant="outlined" />
              <Typography variant="body2">
                Contact: {row.contact_details}
              </Typography>
            </Stack>
          </Stack>
        </Box>

          {/* DIVIDER */}
          <Divider sx={{ my: 2 }} />

          {/* DISTANCE CHIP */}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Chip
              label={`Distance: ${row._distance?.toFixed(2)} km`}
              size="small"
              sx={{
                backgroundColor: "blue",
                color: "white",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultCard;

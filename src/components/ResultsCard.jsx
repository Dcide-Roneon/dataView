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
import ContactModal from "./contactModal";

const formatNumber = (num) => Number(num).toLocaleString();
const ResultCard = ({ row, total, hovered, onHover, onLeave,onClick }) => {
  const distance = getDistanceFromLatLonInKm(
    Number(row.latitude),
    Number(row.longitude)
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Card
        
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
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
              width: "95%%",
            }}
          >
            <Stack direction="row">
              <Box sx={{ ml:1, mr:3}}>
                <Typography variant="h8" fontWeight="bold">
                  {row.company}
                </Typography>
                <Typography fontWeight="medium" sx={{fontSize: 14}}>
                   {row.industry}
                </Typography>
              </Box>
              <Box>
                
                
              </Box>
              <Box sx={{ml:3, mr:2}}>
                <Typography fontWeight="medium" sx={{fontSize:14}}>
                    Distance: {row._distance?.toFixed(2)} km
                  </Typography>
              </Box>
            </Stack> 
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
                {/*
                <Chip
                  label={` Est. KW Requirement: ${row.capacity}`}
                  size="small"
                  sx={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              />
              */}
              <Box sx={{ border:1, padding: 0.5, borderRadius: 3}}>
                <Typography variant="body2">
                  Cloud/IT Spend: ${formatNumber(row.cloud_spend)}
                </Typography>
              </Box>
              <Chip
                label={`Use Case: ${row.use_cases || "N/A"}`}
                variant="outlined"
              />
              <Chip label="Suggested Sales Cart" variant="outlined" />
              <Chip label={`Employees: ${formatNumber(row.employee_count)}`} />
              {/*
              <Chip label="Est. Revenue: Placeholder" variant="outlined" />
              <Typography variant="body2">
                Contact: {row.contact_details}
              </Typography>
              */}
            </Stack>
          </Stack>
        </Box>

          {/* DIVIDER */}
          <Divider sx={{ my: 2 }} />
          <ContactModal contactDetails = {row.contact_details}/>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultCard;

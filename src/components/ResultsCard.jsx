import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import styles from "../styles/ResultsCard.module.css";
import { getDistanceFromLatLonInKm } from "../utils/distance";
import ContactModal from "./contactModal";
import UseCaseModal from "./useCaseModal";

const formatNumber = (num) => Number(num).toLocaleString();

const ResultCard = ({ row, hovered, onHover, onLeave, onClick }) => {
  const distance = getDistanceFromLatLonInKm(
    Number(row.latitude),
    Number(row.longitude)
  );

  return (
    <Box className={styles.cardWrapper}>
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
          width: "100%",
          maxWidth: 300,
        }}
      >
        <CardContent className={styles.cardContentBox}>
          
          <Box className={styles.titleBox}>
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
              <Box sx={{ ml: 1, mr: 3 }}>
                <Typography className={styles.companyText}>
                  {row.company}
                </Typography>
                <Typography className={styles.industryText}>
                  {row.industry}
                </Typography>
              </Box>
              <Box sx={{ ml: "auto", mr: 2 }}>
                <Typography className={styles.distanceText}>
                  Distance: {row._distance?.toFixed(2)} km
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* TWO-COLUMN CONTENT */}
          <Box>
            <Stack className={styles.stackRowSpaceBetween}>
              <Stack className={styles.stackRightColumn}>
                <Box className={styles.cloudSpendBox}>
                  <Typography variant="body2">
                    Cloud/IT Spend: ${formatNumber(row.cloud_spend)}
                  </Typography>
                </Box>
                <UseCaseModal UseCaseDetails={row.use_cases}/>
                <Chip label="Suggested Sales Cart" variant="outlined" />
                <Chip label={`Employees: ${formatNumber(row.employee_count)}`} />
              </Stack>
            </Stack>
          </Box>

          {/* DIVIDER */}
          <Divider className={styles.dividerMargin} />
          <ContactModal contactDetails={row.contact_details} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultCard;

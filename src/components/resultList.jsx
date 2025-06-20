import React from "react";
import ResultCard from "./ResultsCard";
import { Button, Divider } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import downloadToCsv from "../utils/downloadToCsv";

function ResultsList({ results = [], hoveredIndex, setHoveredIndex }) {
  // Role-based access placeholder
  const orderedList = [...results].sort((a, b) => {
    const aDist = a._distance ?? Infinity;
    const bDist = b._distance ?? Infinity;
    return aDist - bDist;
  });

  const limitedList = orderedList.slice(0, 3); // Adjust based on user role when implemented

  if (!Array.isArray(results) || results.length === 0) {
    return <div>No results found</div>;
  } else {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => downloadToCsv(results)}
          sx={{ mb: 2, mt: 1, display: 'flex', justifyContent: 'flex-end' }}
          startIcon={<DownloadIcon />}
        >
          Download CSV
        </Button>

        <Divider sx={{ my: 2 }} />

        {limitedList.map((row, index) => (
          <ResultCard
            key={index}
            row={row}
            total={results.length}
            hovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            index={index}
          />
        ))}
      </div>
    );
  }
}

export default ResultsList;

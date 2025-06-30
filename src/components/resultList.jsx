import React from "react";
import ResultCard from "./ResultsCard";
import { Button, Divider } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import downloadToCsv from "../utils/downloadToCsv";


function ResultsList({ results = [], userLat, userLng, hoveredIndex, setHoveredIndex }) {

  const limitedResults = results.slice(0,3); //change the result
  // Role-based access placeholder
  

  if (!Array.isArray(results) || results.length === 0) {
    return <div>No results found</div>;
  } else {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => downloadToCsv(limitedResults)}
          sx={{ mb: 2, mt: 1, display: 'flex', justifyContent: 'flex-end' }}
          startIcon={<DownloadIcon />}
        >
          Download CSV
        </Button>

        <Divider sx={{ my: 2 }} />

        {limitedResults.map((row, index) => (
          <ResultCard
            key={index}
            row={row}
            total={results.length}
            hovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(index)}
            index={index}
          />
        ))}
      </div>
    );
  }
}

export default ResultsList;

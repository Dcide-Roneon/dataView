import React from "react";
import ResultCard from "./ResultsCard";
import { Button, Typography } from "@mui/material";
import downloadToCsv from "../utils/downloadToCsv";

function ResultsList({ results = [] }) {
  console.log(results);
  if (!Array.isArray(results) || results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      <Button
      variant="outlined"
      color="primary"
      onClick={()=> downloadToCsv(results)}
      sx={{mb:2}}
      >
        Download
      </Button>

      {results.map((row, index) => (
        <ResultCard key={index} row={row} />
      ))}
    </div>
  );
}

export default ResultsList;

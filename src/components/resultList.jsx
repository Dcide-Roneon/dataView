import React from "react";
import ResultCard from "./ResultsCard";
import { Typography } from "@mui/material";

function ResultsList({ results = [] }) {
  console.log(results);
  if (!Array.isArray(results) || results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      {results.map((row, index) => (
        <ResultCard key={index} row={row} />
      ))}
    </div>
  );
}

export default ResultsList;

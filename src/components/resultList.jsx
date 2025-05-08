import React from "react";
import ResultCard from "./practice";
import { Typography } from "@mui/material";

const ResultsList = ({ results }) => {
  if (results.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        No results found.
      </Typography>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {results.map((row) => (
        <ResultCard key={row.id} row={row} />
      ))}
    </div>
  );
};

export default ResultsList;

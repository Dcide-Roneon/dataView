import React from "react";
import { useState } from "react";
import ResultCard from "./ResultsCard";
import { Button, Divider } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import downloadToCsv from "../utils/downloadToCsv";



function ResultsList({ results = [] }) {
  console.log(results);
  if (!Array.isArray(results) || results.length === 0) {
    return <div>No results found</div>;
  }else{
    return (
      <div>
        <Button
        variant="outlined"
        color="primary"
        onClick={()=> downloadToCsv(results)}
        sx={{mb:2, mt:1, display: 'flex', justifyContent: 'flex-end'}}
        startIcon={<DownloadIcon/>}
        >
          
        </Button>
        <Divider sx={{ my: 2 }} />
        {results.map((row, index) => (
          <ResultCard key={index} row={row} total={results.length} />
        ))}
      </div>
    );
  }
}

export default ResultsList;

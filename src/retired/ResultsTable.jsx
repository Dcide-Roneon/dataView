import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography} from "@mui/material";

function ResultsTable({ results }) {
  if (results.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        No results found for your search.
      </Typography>
    );
  }

  return (
    <Paper sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Data Center</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>MW Capacity</TableCell>
            <TableCell>Certifications</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.dataCenter}</TableCell>
              <TableCell>{row.latitude}</TableCell>
              <TableCell>{row.longitude}</TableCell>
              <TableCell>{row.mwCapacity}</TableCell>
              <TableCell>{row.certifications}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ResultsTable;

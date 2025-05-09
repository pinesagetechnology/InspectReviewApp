import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ConditionRatings = ({ data }) => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        2. Condition Ratings and Elements
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Code</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Total qty</strong>
            </TableCell>
            <TableCell>
              <strong>Unit</strong>
            </TableCell>
            <TableCell colSpan={4} align="center">
              <strong>Condition Ratings (0-3)</strong>
            </TableCell>
            <TableCell>
              <strong>Element cond index</strong>
            </TableCell>
            <TableCell>
              <strong>ECI change</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell align="center">0</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.desc}</TableCell>
              <TableCell>{item.totalQty}</TableCell>
              <TableCell>{item.unit}</TableCell>
              {item.condition.map((val, i) => (
                <TableCell key={i} align="center">
                  {val}
                </TableCell>
              ))}
              <TableCell>{item.element}</TableCell>
              <TableCell>{item.eci}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ConditionRatings;

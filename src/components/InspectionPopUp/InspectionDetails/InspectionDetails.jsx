import React from "react";
import { Box, Typography } from "@mui/material";

const InspectionDetails = ({ details }) => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        1. Inspection Details
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ width: "48%" }}>
          <Typography>
            <strong>Bridge Health Index:</strong> {details.healthIndex}
          </Typography>
          <Typography>
            <strong>Level of Inspection:</strong> {details.level}
          </Typography>
          <Typography>
            <strong>Inspection Type:</strong> {details.inspectionType}
          </Typography>
          <Typography>
            <strong>Temperature:</strong> {details.temperature}
          </Typography>
          <Typography>
            <strong>Inspector's Name:</strong> {details.inspector}
          </Typography>
        </Box>

        <Box sx={{ width: "48%" }}>
          <Typography>
            <strong>Inspection Date:</strong> {details.inspectionDate}
          </Typography>
          <Typography>
            <strong>Date of Next Inspection:</strong> {details.nextInspection}
          </Typography>
          <Typography>
            <strong>Weather:</strong> {details.weather}
          </Typography>
          <Typography>
            <strong>Engineer's Name:</strong> {details.engineer}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InspectionDetails;

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import "./InspectionDetails.css";

const InspectionDetails = ({ details }) => {
  return (
    <>
      <Typography className="inspection-detail-title" variant="subtitle1" >
        1. Inspection Details
      </Typography>

      <Divider />

      <Box className="inspection-details-container">
        {/* Left Column */}
        <Box className="inspection-details-container1">
          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Bridge Health Index</strong>
            </span>
            <span className="inspection-container">{details.healthIndex}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Level of Inspection</strong>
            </span>
            <span className="inspection-container">{details.level}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Inspection Type</strong>
            </span>
            <span className="inspection-container">
              {details.inspectionType}
            </span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Temperature</strong>
            </span>
            <span className="inspection-container">{details.temperature}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Inspector's Name</strong>
            </span>
            <span className="inspection-container">{details.inspector}</span>
          </Typography>
        </Box>

        {/* Right Column */}
        <Box className="inspection-details-container2">
          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Inspection Date</strong>
            </span>
            <span className="inspection-container">
              {details.inspectionDate}
            </span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Date of Next Inspection</strong>
            </span>
            <span className="inspection-container">
              {details.nextInspection}
            </span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Weather</strong>
            </span>
            <span className="inspection-container">{details.weather}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Engineer's Name</strong>
            </span>
            <span className="inspection-container">{details.engineer}</span>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InspectionDetails;

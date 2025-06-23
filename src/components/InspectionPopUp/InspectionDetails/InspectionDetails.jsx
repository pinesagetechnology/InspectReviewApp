import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import "./InspectionDetails.css";

const InspectionDetails = ({ details }) => {

  const [inspectionDate, setInspectionDate] = useState();
  const [nextInspectionDate, setNextInspectionDate] = useState();

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const date1 = new Date(details?.inspectionDate);
    const date2 = new Date(details?.nextInspection);
    setInspectionDate(formatDate(date1));
    setNextInspectionDate(formatDate(date2));
  });
  
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
              <strong>Level of Inspection</strong>
            </span>
            <span className="inspection-container">{details?.level}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Inspection Type</strong>
            </span>
            <span className="inspection-container">
              {details?.inspectionType}
            </span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Temperature</strong>
            </span>
            <span className="inspection-container">{details?.temperature}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Inspector's Name</strong>
            </span>
            <span className="inspection-container">{details?.inspector}</span>
          </Typography>
        </Box>

        {/* Right Column */}
        <Box className="inspection-details-container2">
          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Inspection Date</strong>
            </span>
            <span className="inspection-container">
              {inspectionDate}
            </span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Date of Next Inspection</strong>
            </span>
            <span className="inspection-container">
              {nextInspectionDate}
            </span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Weather</strong>
            </span>
            <span className="inspection-container">{details?.weather}</span>
          </Typography>

          <Typography className="inspection-detail">
            <span className="inspection-container">
              <strong>Engineer's Name</strong>
            </span>
            <span className="inspection-container">{details?.engineer}</span>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InspectionDetails;

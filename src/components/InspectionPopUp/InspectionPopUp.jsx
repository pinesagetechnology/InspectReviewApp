import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { FiX } from "react-icons/fi";

import InspectionDetails from "./InspectionDetails/InspectionDetails";
import ConditionRatings from "./ConditionRatings/ConditionRatings";
import MaintenanceActions from "./MaintainenceAction/MaintainenceAction";
import InspectorComment from "./InspectorComment/InspectorComment";
import './InspectionPopUp.css'

const InspectionPopUp = ({ open, onClose }) => {
  const [activeFilter, setActiveFilter] = useState("current");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const inspectionDetails = {
    healthIndex: "Good",
    level: "Level 2",
    inspectionDate: "Friday 14 June 2024",
    inspectionType: "Normal",
    nextInspection: "December 2024",
    temperature: "16 degrees",
    weather: "Showers",
    inspector: "John Smith",
    engineer: "Jane Doe",
  };

  const conditionData = [
    {
      code: "MAPP",
      desc: "Approach Carriageway",
      totalQty: 160,
      unit: "ea",
      condition: [0, 0, 2, 0],
      element: "+67.0",
      eci: "+0.0",
    },
    {
      code: "MAPP",
      desc: "Approach Carriageway",
      totalQty: 160,
      unit: "ea",
      condition: [0, 1, 0, 0],
      element: "+67.0",
      eci: "+0.0",
    },
    {
      code: "MAPP",
      desc: "Approach Carriageway",
      totalQty: 160,
      unit: "ea",
      condition: [0, 0, 0, 0],
      element: "+67.0",
      eci: "+0.0",
    },
  ];

  const maintenanceData = [
    {
      elemCode: "MWWY",
      actNo: "316.00",
      description: "Remove Tree",
      comments: "Remove tree from both U/S and D/S of the culvert",
      qty: "5 ea",
      date: "June 22",
      prob: 1,
      cons: 1,
      inactionRisk: 1,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjPTLtQ5UhpnqPtqMOrpcavRrpjcfuMWsCIMlcgFwygOcYgmA",
    },
    {
      elemCode: "MWWY",
      actNo: "316.00",
      description: "Remove Tree",
      comments: "Remove tree from both U/S and D/S of the culvert",
      qty: "5 ea",
      date: "June 22",
      prob: 1,
      cons: 1,
      inactionRisk: 1,
      photo:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP56HI9MYMmNfnP1kG2TjXOoSsFFIdyFWPmXkMQRGuj4jKWeEZ",
    },
    {
      elemCode: "MWWY",
      actNo: "316.00",
      description: "Remove Tree",
      comments: "Remove tree from both U/S and D/S of the culvert",
      qty: "5 ea",
      date: "June 22",
      prob: 1,
      cons: 1,
      inactionRisk: 1,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TGcA7wifBCRGm0FNRGV1vwS-wbI0s4Hzs2oJHcpP4RA3Ewjz",
    },
  ];

  const inspectorComment = `Donec pulvinar ligula ut purus elementum lacinia. Suspendisse dignissim ut sem at laoreet. Vestibulum vehicula purus vitae pellentesque ultrices. Nulla ex lectus, sodales at pulvinar a, dapibus ut leo. Aliquam at aliquam diam. Donec sollicitudin rhoncus lectus at euismod.`;

  return (
    <Modal className="modal-container" open={open} onClose={onClose}>
      <Box className="box-container">
        {/* Header */}
        <Box className="header-box">
          <Typography variant="h6">
            Bridge 1015 Inspection Report
          </Typography>
          <FiX className="close-icon" onClick={onClose}/>
        </Box>

        {/* Tabs */}
        <Box className="tabs-box" >
          {["current", "past"].map((filter) => (
            <Box className="tabs-title-box"
              key={filter}
              sx={{
                borderBottom: activeFilter === filter ? "4px solid #0066FF" : "none",
              }}
              onClick={() => handleFilterClick(filter)}
            >
              <Typography>
                {filter === "current"
                  ? "Current Inspection"
                  : "Past Inspection"}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Content */}
        <Box className="content-box">
          {activeFilter === "current" ? (
            <>
              <InspectionDetails details={inspectionDetails} />
              <Divider />
              <ConditionRatings data={conditionData} />
              <Divider />
              <MaintenanceActions data={maintenanceData} />
              <Divider />
              <InspectorComment comment={inspectorComment} />
            </>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Past inspection data will appear here.
            </Typography>
          )}
        </Box>

        {/* Footer Buttons */}
        <Box className="footer-btn-box">
          <Button className="footer-btn" variant="outlined" onClick={onClose}>
            Approve and Close
          </Button>
          <Button className="footer-btn2">
            Approve and Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InspectionPopUp;

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
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 900,
          bgcolor: "#fff",
          boxShadow: 24,
          borderRadius: 2,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            background: "#0066FF",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", fontFamily: "poppins", fontSize: "18px" }}
          >
            Bridge 1015 Inspection Report
          </Typography>
          <FiX
            style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
            onClick={onClose}
          />
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            background: "#fff",
            boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {["current", "past"].map((filter) => (
            <Box
              key={filter}
              sx={{
                borderBottom:
                  activeFilter === filter ? "4px solid #0066FF" : "none",
                padding: "12px 20px",
                cursor: "pointer",
              }}
              onClick={() => handleFilterClick(filter)}
            >
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {filter === "current"
                  ? "Current Inspection"
                  : "Past Inspection"}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 3,
            overflowY: "auto",
            flex: 1,
          }}
        >
          {activeFilter === "current" ? (
            <>
              <InspectionDetails details={inspectionDetails} />
              <Divider sx={{ my: 3 }} />
              <ConditionRatings data={conditionData} />
              <Divider sx={{ my: 3 }} />
              <MaintenanceActions data={maintenanceData} />
              <Divider sx={{ my: 3 }} />
              <InspectorComment comment={inspectorComment} />
            </>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Past inspection data will appear here.
            </Typography>
          )}
        </Box>

        {/* Footer Buttons */}
        <Box
          sx={{
            p: 2,
            background: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            boxShadow: "0px -1px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              fontFamily: "poppins",
              fontSize: "12px",
              textTransform: "none",
              color: "#0066FF",
              width: 170,
              height: 45,
            }}
          >
            Approve and Close
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              fontFamily: "poppins",
              fontSize: "12px",
              textTransform: "none",
              backgroundColor: "#0066FF",
              width: 170,
              height: 45,
            }}
          >
            Approve and Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InspectionPopUp;

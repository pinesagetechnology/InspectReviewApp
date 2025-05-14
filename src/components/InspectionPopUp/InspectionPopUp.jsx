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
import { useSelector } from "react-redux";
import './InspectionPopUp.css'

const InspectionPopUp = ({ open, onClose, id }) => {
  const [activeFilter, setActiveFilter] = useState("current");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const { inspections: inspectionList } = useSelector(
    (state) => state.inspectionList
  );

  const inspectionData = inspectionList.find((item) => item.structureId === id);

  const inspectionDetails = {
    healthIndex: "Unknown",
    level: inspectionData?.inspectionLevel,
    inspectionDate: inspectionData?.inspectionDate,
    inspectionType: inspectionData?.inspectionType,
    nextInspection: inspectionData?.nextInspectionProposedDate,
    temperature: inspectionData?.temperature,
    weather: inspectionData?.weather,
    inspector: inspectionData?.inspectorName,
    engineer: inspectionData?.engineerName,
  };

  const conditionData = inspectionData?.conditionRatings.map((rating) => ({
    code: rating?.elementCode,
    desc: rating?.elementDescription,
    totalQty: 160,
    unit: "ea",
    condition: rating?.ratings,
    element: "+67.0",
    eci: "+0.0",
  }));

  const maintenanceData = inspectionData?.maintenanceActions.map((action) => ({
    elemCode: action?.elementCode,
    actNo: action?.mmsActNo,
    description: action?.elementDescription,
    comments: action?.inspectionComment,
    qty: action?.units,
    date: action?.dateForCompletion,
    prob: action?.probability,
    cons: action?.consequenceOfInteraction,
    inactionRisk: action?.activityInactionRisk,
    photos:
      action?.photos?.map((photo) => ({
        url: photo?.url,
        fileName: photo?.fileName,
      })) || [],
  }));

  const inspectorComment = inspectionData?.comment || "No comments available";

  return (
    <Modal className="modal-container" open={open} onClose={onClose}>
      <Box className="box-container" >
        {/* Header */}
        <Box className="header-box" >
          <Typography variant="h6" >
            Bridge 1015 Inspection Report
          </Typography>
          <FiX className="close-icon" onClick={onClose} />
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
              <Typography >
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
              <Divider/>
              <MaintenanceActions data={maintenanceData} />
              <Divider/>
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
          <Button className="footer-btn2" variant="contained" onClick={onClose}>
            Approve and Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InspectionPopUp;

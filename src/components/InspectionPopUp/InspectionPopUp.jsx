import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Box, Typography, Divider, Modal, Button } from "@mui/material";
import InspectionDetails from "./InspectionDetails/InspectionDetails";
import ConditionRatings from "./ConditionRatings/ConditionRatings";
import MaintenanceActions from "./MaintainenceAction/MaintainenceAction";
import InspectorComment from "./InspectorComment/InspectorComment";
import { useSelector } from "react-redux";
import './InspectionPopUp.css'

const InspectionPopUp = ({ open, onClose, inspectionId, structureId }) => {
  const [activeFilter, setActiveFilter] = useState("current");
  // const [inspectionData, setInspectionData] = useState(null);
  // const [previousInspection, setPreviousInspection] = useState(null);
  const [selectedStructure, setSelectedStructure] = useState({});

  const [currentInspectionData, setCurrentInspectionData] = useState(null);
  const [previousInspectionData, setPreviousInspectionData] = useState(null);

  const inspections = useSelector((state) => state.inspectionList.inspections);
  const structureList = useSelector((state) => state.structure.structureList);

  useEffect(() => {
    console.log("Inspections", inspections, inspectionId, structureId);
    const filterInspections = inspections.filter((item) => item.structureId === structureId);
    if (filterInspections.length === 0) {
      setCurrentInspectionData(null);
      setPreviousInspectionData(null);
      return;
    }
    const foundIndex = filterInspections.findIndex((item) => item.id === inspectionId);
    console.log("Found Index", foundIndex);
    if (foundIndex > 0) {
      const previousInspection = (filterInspections[foundIndex - 1]);
      const previousInspectionDetails = getInspectionDetails(previousInspection);
      const previousConditionData = getConditionRatings(previousInspection);
      const previousMaintenanceData = getMaintenanceActions(previousInspection);
      const previousInspectorComment = previousInspection?.comment || "No comments available";
      setPreviousInspectionData({ previousInspectionDetails, previousConditionData, previousMaintenanceData, previousInspectorComment });

    }

    const inspectionData = (filterInspections[foundIndex]);
    console.log("Inspection Data", inspectionData);
    const inspectionDetails = getInspectionDetails(inspectionData);
    const conditionData = getConditionRatings(inspectionData);
    const maintenanceData = getMaintenanceActions(inspectionData);
    const inspectorComment = inspectionData?.comment || "No comments available";

    setCurrentInspectionData({ inspectionDetails, conditionData, maintenanceData, inspectorComment });
  }, [inspections, inspectionId, structureId]);

  useEffect(() => {
    const structure = structureList.find((item) => item.id === structureId);
    setSelectedStructure(structure);
  }, [structureList]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const getInspectionDetails = (inspectionData) => {
    return {
      level: inspectionData?.inspectionLevel,
      inspectionDate: inspectionData?.inspectionDate,
      inspectionType: inspectionData?.inspectionType,
      nextInspection: inspectionData?.nextInspectionProposedDate,
      temperature: inspectionData?.temperature,
      weather: inspectionData?.weather,
      inspector: inspectionData?.inspectorName,
      engineer: inspectionData?.engineerName,
    };
  };

  const getConditionRatings = (inspectionData) => {
    return inspectionData?.conditionRatings.map((rating) => ({
      code: rating?.elementCode,
      desc: rating?.elementDescription,
      totalQty: rating?.totalQty,
      unit: rating?.unit,
      condition: rating?.ratings,
    }));
  };

  const getMaintenanceActions = (inspectionData) => {
    return inspectionData?.maintenanceActions.map((action) => ({
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
          apiResponse: photo?.apiResponse,
        })) || [],
    }));
  };

  return (
    <Modal className="modal-container" open={open} onClose={onClose}>
      <Box className="box-container" >
        {/* Header */}
        <Box className="header-box" >
          <Typography variant="h6" >
            {selectedStructure?.name} Inspection Report
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
              <InspectionDetails details={currentInspectionData?.inspectionDetails} />
              <Divider />
              <ConditionRatings data={currentInspectionData?.conditionData} />
              <Divider />
              <MaintenanceActions data={currentInspectionData?.maintenanceData} />
              <Divider />
              <InspectorComment comment={currentInspectionData?.inspectorComment} />
            </>
          ) : (
            <>
              <InspectionDetails details={previousInspectionData?.previousInspectionDetails} />
              <Divider />
              <ConditionRatings data={previousInspectionData?.previousConditionData} />
              <Divider />
              <MaintenanceActions data={previousInspectionData?.previousMaintenanceData} />
              <Divider />
              <InspectorComment comment={previousInspectionData?.previousInspectorComment} />
            </>
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

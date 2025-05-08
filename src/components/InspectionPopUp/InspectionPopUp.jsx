import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const InspectionPopUp = ({ open, onClose }) => {
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

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bridge 1015 Inspection Report
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          1. Inspection Details
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ width: "48%" }}>
            <Typography>
              <strong>Bridge Health Index:</strong>{" "}
              {inspectionDetails.healthIndex}
            </Typography>
            <Typography>
              <strong>Level of Inspection:</strong> {inspectionDetails.level}
            </Typography>
            <Typography>
              <strong>Inspection Type:</strong>{" "}
              {inspectionDetails.inspectionType}
            </Typography>
            <Typography>
              <strong>Temperature:</strong> {inspectionDetails.temperature}
            </Typography>
            <Typography>
              <strong>Inspector's Name:</strong> {inspectionDetails.inspector}
            </Typography>
          </Box>

          <Box sx={{ width: "48%" }}>
            <Typography>
              <strong>Inspection Date:</strong>{" "}
              {inspectionDetails.inspectionDate}
            </Typography>
            <Typography>
              <strong>Date of Next Inspection:</strong>{" "}
              {inspectionDetails.nextInspection}
            </Typography>
            <Typography>
              <strong>Weather:</strong> {inspectionDetails.weather}
            </Typography>
            <Typography>
              <strong>Engineer's Name:</strong> {inspectionDetails.engineer}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
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
            {conditionData.map((item, index) => (
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

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button variant="outlined" onClick={onClose}>
            Approve and Close
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Approve and Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InspectionPopUp;

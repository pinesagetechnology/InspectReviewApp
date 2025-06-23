import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import "./LogoutPopUp.css";

const LogoutPopUp = ({ open, onClose, onConfirm }) => {
  return (
    <Modal className="logoutpop-main-container" open={open} onClose={onClose}>
      <Box
        className="logoutpop-container"
        sx={{
          height: "130px",
          width: "300px",
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you sure you want to log out?
        </Typography>
        <Box
          className="logoutpop-btns"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutPopUp;

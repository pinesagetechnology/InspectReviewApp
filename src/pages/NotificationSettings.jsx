import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Header from "../components/Header/Header";

const NotificationSettings = () => {
  return (
    <>
      <Header />
      <Box p={4} marginTop={"5%"}>
        <Typography variant="h5" gutterBottom>
          Notification settings
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Notify me:
        </Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="When a bridge inspector has completed an inspection"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="When a high risk RMA is identified"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="2 weeks before an inspection review is due"
        />
      </Box>
    </>
  );
};

export default NotificationSettings;

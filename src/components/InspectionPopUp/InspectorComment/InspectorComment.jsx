import React from "react";
import { Typography, Box } from "@mui/material";

const InspectorComment = ({ comment }) => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
        4. Inspector’s comments
      </Typography>

      <Box
        sx={{
          backgroundColor: "#D1FADF",
          p: 2,
          borderRadius: 2,
          whiteSpace: "pre-line",
        }}
      >
        <Typography>{comment}</Typography>
      </Box>
    </>
  );
};

export default InspectorComment;

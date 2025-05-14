import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import "./InspectorComment.css";

const InspectorComment = ({ comment }) => {
  return (
    <>
      <Box className="space-box" />
      <Divider />
      <Typography className="inspector-comment-title" variant="subtitle1">
        4. Inspector’s comments
      </Typography>
      <Divider />

      <Box>
        <Typography className="inspector-comment">{comment}</Typography>
      </Box>
    </>
  );
};

export default InspectorComment;

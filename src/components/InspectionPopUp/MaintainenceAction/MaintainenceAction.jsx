import React, { useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Modal,
} from "@mui/material";

const MaintenanceActions = ({ data }) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewAllPhotos, setViewAllPhotos] = useState(false);

  const handlePhotoClick = (photoUrl) => {
    setSelectedPhoto(photoUrl);
    setOpenPhoto(true);
  };

  const handleClosePhoto = () => {
    setOpenPhoto(false);
    setSelectedPhoto(null);
  };

  const handleOpenAllPhotos = () => {
    setViewAllPhotos(true);
  };

  const handleCloseAllPhotos = () => {
    setViewAllPhotos(false);
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
        3. Required maintenance activities and actions
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Elem Code</strong>
            </TableCell>
            <TableCell>
              <strong>MMS Act. No.</strong>
            </TableCell>
            <TableCell>
              <strong>MMS Activity Description</strong>
            </TableCell>
            <TableCell>
              <strong>Inspector’s Comments</strong>
            </TableCell>
            <TableCell>
              <strong>Est qty</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Prob (a)</strong>
            </TableCell>
            <TableCell>
              <strong>Cons (b)</strong>
            </TableCell>
            <TableCell>
              <strong>Inaction risk</strong>
            </TableCell>
            <TableCell
              sx={{
                cursor: "pointer",
                color: "#1976d2",
                textDecoration: "underline",
              }}
              onClick={handleOpenAllPhotos}
            >
              <strong>Photos</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.elemCode}</TableCell>
              <TableCell>{item.actNo}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.comments}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    // backgroundColor: "#D1FADF",
                    borderRadius: 1,
                    padding: "2px 8px",
                    textAlign: "center",
                  }}
                >
                  {item.prob}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    // backgroundColor: "#D1FADF",
                    borderRadius: 1,
                    padding: "2px 8px",
                    textAlign: "center",
                  }}
                >
                  {item.cons}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    // backgroundColor: "#D1FADF",
                    borderRadius: 1,
                    padding: "2px 8px",
                    textAlign: "center",
                  }}
                >
                  {item.inactionRisk}
                </Box>
              </TableCell>
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={item.photo}
                  alt="Photo"
                  sx={{ width: 40, height: 40, cursor: "pointer" }}
                  onClick={() => handlePhotoClick(item.photo)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Single Photo Modal */}
      <Modal open={openPhoto} onClose={handleClosePhoto}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            outline: "none",
            maxHeight: "90vh",
            maxWidth: "90vw",
          }}
        >
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Full View"
              style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 4 }}
            />
          )}
        </Box>
      </Modal>

      {/* All Photos Modal */}
      <Modal open={viewAllPhotos} onClose={handleCloseAllPhotos}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            outline: "none",
            maxHeight: "90vh",
            maxWidth: "90vw",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            All Photos
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {data.map((item, index) => (
              <img
                key={index}
                src={item.photo}
                alt={`Photo ${index + 1}`}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MaintenanceActions;

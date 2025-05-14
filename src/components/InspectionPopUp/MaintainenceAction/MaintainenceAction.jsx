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
  IconButton,
  Divider,
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./MaintenanceAction.css";

const MaintenanceActions = ({ data }) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewAllPhotos, setViewAllPhotos] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePhotoClick = (index) => {
    setSelectedIndex(index);
    setOpenPhoto(true);
  };

  const handleClosePhoto = () => {
    setOpenPhoto(false);
    setSelectedIndex(null);
  };

  const handleOpenAllPhotos = () => {
    setViewAllPhotos(true);
  };

  const handleCloseAllPhotos = () => {
    setViewAllPhotos(false);
  };

  const selectedPhotos =
    selectedIndex !== null ? data[selectedIndex]?.photos || [] : [];

  return (
    <>
      <Box className="space-box" />
      <Divider />
      <Typography className="maintenance-action-title" variant="subtitle1">
        3. Required maintenance activities and actions
      </Typography>
      <Divider />

      <Paper className="table-main-container">
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="maintenance table">
            <TableHead>
              <TableRow className="maintenance-action-table-head1">
                <TableCell>Elem</TableCell>
                <TableCell>MMS</TableCell>
                <TableCell>MMS Activity</TableCell>
                <TableCell>Inspector's Comments</TableCell>
                <TableCell align="center">Est</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Prob</TableCell>
                <TableCell align="center">Cons</TableCell>
                <TableCell align="center">Inaction</TableCell>
                <TableCell
                  align="center"
                  className="photos-btn"
                  // onClick={handleOpenAllPhotos}
                  // sx={{ cursor: "pointer" }}
                >
                  Photos
                </TableCell>
              </TableRow>
              <TableRow className="maintenance-action-table-head2">
                <TableCell>Code</TableCell>
                <TableCell width={50}>Act. No.</TableCell>
                <TableCell>Description</TableCell>
                <TableCell colSpan={1} />
                <TableCell align="center">qty</TableCell>
                <TableCell colSpan={1} />
                <TableCell align="center">(a)</TableCell>
                <TableCell align="center">(b)</TableCell>
                <TableCell align="center">risk</TableCell>
                <TableCell colSpan={1} />
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.elemCode}</TableCell>
                    <TableCell>{item.actNo}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.comments}</TableCell>
                    <TableCell align="center">{item.qty}</TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ borderRadius: 1, p: "2px 8px" }}>
                        {item.prob}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ borderRadius: 1, p: "2px 8px" }}>
                        {item.cons}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ borderRadius: 1, p: "2px 8px" }}>
                        {item.inactionRisk}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Avatar
                        variant="rounded"
                        src={item.photos?.[0]?.url}
                        alt="Photo"
                        sx={{ width: 40, height: 40, cursor: "pointer" }}
                        onClick={() =>
                          handlePhotoClick(index + page * rowsPerPage)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ fontFamily: "Poppins", fontSize: "14px" }}
        />
      </Paper>

      {/* Single Photo Modal with Thumbnails */}
      <Modal open={openPhoto} onClose={handleClosePhoto}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 1300,
          }}
        >
          <IconButton
            onClick={handleClosePhoto}
            sx={{ position: "absolute", top: 20, right: 20, color: "#fff" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {selectedPhotos.length > 0 && (
            <>
              <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
                {`Photos for item ${selectedIndex + 1}`}
              </Typography>
              <Box
                component="img"
                src={selectedPhotos[0].url}
                alt={selectedPhotos[0].fileName}
                sx={{
                  maxHeight: "60vh",
                  maxWidth: "80vw",
                  borderRadius: 1,
                  mb: 2,
                  border: "4px solid #fff",
                  boxShadow: 4,
                }}
              />
              <Typography variant="caption" sx={{ color: "#fff" }}>
                {selectedPhotos[0].fileName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                  overflowX: "auto",
                  px: 3,
                  pb: 2,
                }}
              >
                {selectedPhotos.map((photo, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={photo.url}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => {
                      // Swap the main photo
                      data[selectedIndex].photos.unshift(
                        data[selectedIndex].photos.splice(idx, 1)[0]
                      );
                    }}
                    sx={{
                      width: 120,
                      height: "auto",
                      borderRadius: 1,
                      border:
                        idx === 0 ? "3px solid #1976d2" : "2px solid #fff",
                      cursor: "pointer",
                      boxShadow: 2,
                    }}
                  />
                ))}
              </Box>
            </>
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

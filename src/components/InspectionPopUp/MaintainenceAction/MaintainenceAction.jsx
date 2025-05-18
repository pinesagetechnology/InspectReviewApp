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
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                <TableCell style={{ minWidth: 80 }}>MMS Activity</TableCell>
                <TableCell style={{ minWidth: 140 }}>Inspector's Comments</TableCell>
                <TableCell align="center">Est</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Prob</TableCell>
                <TableCell align="center">Cons</TableCell>
                <TableCell align="center">Inaction</TableCell>
                <TableCell align="center" className="photos-btn">
                  Photos
                </TableCell>
              </TableRow>
              <TableRow className="maintenance-action-table-head2">
                <TableCell>Code</TableCell>
                <TableCell style={{ minWidth: 50 }}>Act. No.</TableCell>
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
            <TableBody className="maintenance-action-table-body">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.elemCode}</TableCell>
                    <TableCell>{item.actNo}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.comments}</TableCell>
                    <TableCell align="center" width={30}>{item.qty}</TableCell>
                    <TableCell align="center" width={50}>{item.date}</TableCell>
                    <TableCell align="center">{item.prob}</TableCell>
                    <TableCell align="center">{item.cons}</TableCell>
                    <TableCell align="center">{item.inactionRisk}</TableCell>
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
          className="table-pagination"
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>

      {/* Single Photo Modal with Thumbnails */}
      <Modal className="single-photo-modal" open={openPhoto} onClose={handleClosePhoto}>
        <Box className="single-photo-modal-box">
          <IconButton onClick={handleClosePhoto}>
            <CloseIcon fontSize="large" />
          </IconButton>

          {selectedPhotos.length > 0 && (
            <>
              <Typography className="single-photo-title" variant="body1">
                {`Photos for item ${selectedIndex + 1}`}
              </Typography>
              <Box 
                className="single-photo-imgbox1"
                component="img"
                src={selectedPhotos[0].url}
                alt={selectedPhotos[0].fileName} 
              />
              <Typography className="single-photo-img-caption" variant="caption" >
                {selectedPhotos[0].fileName}
              </Typography>
              <Box className="single-photo-imgbox2" >
                {selectedPhotos.map((photo, idx) => (
                  <Box className="single-photo-img"
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
                    sx={{ border: idx === 0 ? "3px solid #1976d2" : "2px solid #fff", }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* All Photos Modal */}
      <Modal open={viewAllPhotos} onClose={handleCloseAllPhotos}>
        <Box className="all-photos-box">
          <Typography variant="h6">
            All Photos
          </Typography>
          <Box className="all-photos-imgbox">
            {data.map((item, index) => (
              <img
                className="all-photos-img"
                key={index}
                src={item.photo}
                alt={`Photo ${index + 1}`} />
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MaintenanceActions;

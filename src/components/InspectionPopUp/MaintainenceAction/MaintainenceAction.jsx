import React, { useState, useEffect } from "react";
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
import assetApiService from "../../../services/assetApiService";

const MaintenanceActions = ({ data }) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    if (selectedIndex !== null) {
      console.log("Data", data[selectedIndex].photos);
      (data[selectedIndex]?.photos || []).map(async (photo) => {
        const photos = await assetApiService.getPhotos(photo.apiResponse.id);
        setImages(prevImages => [...prevImages, photos]);
      })
    }
  }, [selectedIndex]);



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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleClickonImageBox = (index) => {
    setImageUrl(images[index].url);
    setImageName(images[index].fileName);
  };

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
                <TableCell style={{ minWidth: 80 }} align="center">Date</TableCell>
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
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const myDate = new Date(item.date);
                  const formattedDate = formatDate(myDate);

                  return (
                    <TableRow key={index}>
                      <TableCell>{item.elemCode}</TableCell>
                      <TableCell>{item.actNo}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.comments}</TableCell>
                      <TableCell align="center" width={30}>{item.qty}</TableCell>
                      <TableCell align="center" >{formattedDate}</TableCell>
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
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data?.length}
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

          {images.length > 0 && (
            <>
              <Typography className="single-photo-title" variant="body1">
                {`Photos for item ${selectedIndex + 1}`}
              </Typography>
              <Box
                className="single-photo-imgbox1"
                component="img"
                src={imageUrl}
                alt={imageName}
              />
              <Typography className="single-photo-img-caption" variant="caption" >
                {imageName}
              </Typography>
              <Box className="single-photo-imgbox2" >
                {images.map((photo, idx) => (
                  <Box className="single-photo-img"
                    key={idx}
                    component="img"
                    src={photo.url}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => handleClickonImageBox(idx)}
                    sx={{ border: idx === 0 ? "3px solid #1976d2" : "2px solid #fff", }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MaintenanceActions;

import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  TableContainer,
  TablePagination,
  Divider,
} from "@mui/material";
import "./ConditionRatings.css";

const ConditionRatings = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box className="space-box" sx={{ mt: 3 }} />
      <Divider />
      <Typography
        className="condition-rating-title"
        variant="subtitle1"
        gutterBottom
      >
        2. Condition Ratings and Elements
      </Typography>
      <Divider />

      <Paper className="table-main-container">
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="condition ratings table" size="small">
            <TableHead>
              <TableRow className="table-head1">
                <TableCell>
                  <strong>Code</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Total qty</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Unit</strong>
                </TableCell>
                <TableCell colSpan={4} align="center">
                  <strong>Condition Ratings (0-3)</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Element cond index</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>ECI change</strong>
                </TableCell>
              </TableRow>
              <TableRow className="table-head2">
                <TableCell colSpan={2} />
                <TableCell align="center">qty</TableCell>
                <TableCell />
                {[0, 1, 2, 3].map((rating) => (
                  <TableCell key={rating} align="center">
                    {rating}
                  </TableCell>
                ))}
                <TableCell align="center">cond index</TableCell>
                <TableCell align="center">change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.desc}</TableCell>
                    <TableCell align="center">{item.totalQty}</TableCell>
                    <TableCell align="center">{item.unit}</TableCell>
                    {item.condition.map((val, i) => (
                      <TableCell key={i} align="center">
                        {val}
                      </TableCell>
                    ))}
                    <TableCell align="center">{item.element}</TableCell>
                    <TableCell align="center">{item.eci}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ fontFamily: "Poppins", fontSize: "14px" }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ConditionRatings;

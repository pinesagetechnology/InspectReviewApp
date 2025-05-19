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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box className="space-box" />

      <Divider />

      <Typography className="condition-rating-title" variant="subtitle1" >
        2. Condition Ratings and Elements
      </Typography>

      <Divider />

      <Paper className="table-main-container">
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="condition ratings table">
          <TableHead>
              <TableRow className="table-head1">
                <TableCell>Code</TableCell>
                <TableCell style={{ minWidth: 150 }}>Description</TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">Total</TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">Units</TableCell>
                <TableCell colSpan={4} align="center">Condition rating</TableCell>
                <TableCell style={{ minWidth: 70 }} align="center">Element</TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">ECI</TableCell>
              </TableRow>
              <TableRow className="table-head2">
                <TableCell colSpan={2}  align="center"/>
                <TableCell  align="center">qty</TableCell>
                <TableCell colSpan={1} />
                {[1, 2, 3, 4].map((rating) => (
                  <TableCell key={rating} align="center">{rating}</TableCell>
                ))}
                <TableCell  align="center">cond index</TableCell>
                <TableCell  align="center">change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="condition-rating-table-body">
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
          className="table-pagination"
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

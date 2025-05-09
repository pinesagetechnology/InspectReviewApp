import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./InspectionTable.css";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowUnsorted } from "react-icons/ti";
import { LuNotepadText } from "react-icons/lu";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import InspectionPopup from "../InspectionPopUp/InspectionPopUp";
import InspectionPopUp from "../InspectionPopUp/InspectionPopUp";

const InspectionTable = () => {
  // const [showPopup, setShowPopup] = useState(false);

  const data = [
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Troy Nash",
      inspectionDate: "Monday 3 July 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Steve Everett",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Will Sullivan",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Troy Nash",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Troy Nash",
      inspectionDate: "Monday 3 July 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Steve Everett",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Will Sullivan",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Troy Nash",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Troy Nash",
      inspectionDate: "Monday 3 July 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Steve Everett",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Will Sullivan",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
    {
      bin: "1029",
      description: "T-Truss Bridge",
      inspectionType: "Normal",
      inspectedBy: "Troy Nash",
      inspectionDate: "Monday 3 September 2024",
      bhi: "Good",
      newRMAs: 1,
      highestRisk: 4,
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activeFilter, setActiveFilter] = useState("complete");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <div className="filter_container">
        <div
          className={`completed-filter ${
            activeFilter === "complete" ? "active" : ""
          }`}
          onClick={() => filterClick("complete")}
        >
          <p>
            Completed <span style={{ color: "#0066FF" }}>({data.length})</span>
          </p>
        </div>
        <div
          className={`inprogress-filter ${
            activeFilter === "inprogress" ? "active" : ""
          }`}
          onClick={() => filterClick("inprogress")}
        >
          <p>
            In Progress{" "}
            <span style={{ color: "#0066FF" }}>({data.length})</span>
          </p>
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "0px" }}>
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="table-head">
                <TableCell style={{ minWidth: 50 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>BiN</div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 180 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>Description</div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>Inspection type</div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>Inspected by</div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>Inspection date</div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 50 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>BHI</div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 30 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>
                      New <br /> RMAs
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 100 }}>
                  <div className="table-title">
                    <TiArrowUnsorted className="icon" />
                    <div>
                      Highest <br /> Risk rating
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 100 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      <TableCell>{row.bin}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.inspectionType}</TableCell>
                      <TableCell>{row.inspectedBy}</TableCell>
                      <TableCell>{row.inspectionDate}</TableCell>
                      <TableCell>{row.bhi}</TableCell>
                      <TableCell align="center">{row.newRMAs}</TableCell>
                      <TableCell align="center">{row.highestRisk}</TableCell>
                      <TableCell>
                        <div className="action-column">
                          <button onClick={handleOpen}>
                            Review inspection <LuNotepadText className="icon" />{" "}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {/* {showPopup && <InspectionPopup onClose={() => setShowPopup(false)} />} */}
        </TableContainer>
        <TablePagination
          sx={{ fontFamily: "Poppins", fontSize: "14px" }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <InspectionPopUp open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Inspection Details</h2>
          <p>This is where you can show detailed info about the inspection.</p>
          <button onClick={handleClose}>Close</button>
        </Box>
      </InspectionPopUp>
    </>
  );
};

export default InspectionTable;

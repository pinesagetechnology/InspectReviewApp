import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

import "./InspectionTable.css";
import { TiArrowUnsorted } from "react-icons/ti";
import { LuNotepadText } from "react-icons/lu";

import InspectionPopUp from "../InspectionPopUp/InspectionPopUp";
import {
  fetchInspectionsStart,
  fetchInspectionsSuccess,
  fetchInspectionsFailure,
} from "../../redux/inspectionSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Search from "../Search/Search"; // Make sure Search accepts a prop for setting searchTerm

const InspectionTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState(null);

  const dispatch = useDispatch();
  const { inspections, loading } = useSelector((state) => state.structure);
  const { inspections: inspectionList } = useSelector(
    (state) => state.inspectionList
  );

  console.log("Inspection List", inspectionList);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("Data", data);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchInspectionsStart());
      try {
        const token = Cookies.get("token");
        const res = await axios.get("/api/inspect/api/Structure/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transformedData = res.data.map((item) => ({
          id: item.id,
          code: item.code,
          description: item.name,
          inspectionType: item.previousInspection?.inspectionType || "-",
          inspectedBy: item.previousInspection?.inspectorName || "-",
          inspectionDate: item.previousInspection?.inspectionDate || "-",
        }));

        setData(transformedData);
        dispatch(fetchInspectionsSuccess(transformedData));
      } catch (error) {
        dispatch(fetchInspectionsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedFilteredData = () => {
    let filteredData = data.filter((item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  };

  const visibleRows = sortedFilteredData().slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Search setSearchTerm={setSearchTerm} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="filter_container">
            <div className="completed-filter active">
              <p>
                Completed{" "}
                <span style={{ color: "#0066FF" }}>
                  ({sortedFilteredData().length})
                </span>
              </p>
            </div>
          </div>

          <Paper
            sx={{ width: "100%", overflow: "hidden", borderRadius: "0px" }}
          >
            <TableContainer className="table-container">
              <Table stickyHeader aria-label="inspection table">
                <TableHead>
                  <TableRow className="table-head">
                    {[
                      "code",
                      "description",
                      "inspectionType",
                      "inspectedBy",
                      "inspectionDate",
                    ].map((key) => (
                      <TableCell
                        key={key}
                        onClick={() => requestSort(key)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="table-title">
                          <TiArrowUnsorted className="icon" />
                          <div>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </div>
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {visibleRows.map((row, idx) => (
                    <TableRow hover tabIndex={-1} key={idx}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.inspectionType}</TableCell>
                      <TableCell>{row.inspectedBy}</TableCell>
                      <TableCell>{row.inspectionDate}</TableCell>
                      <TableCell>
                        <div className="action-column">
                          {/* <button onClick={handleOpen}> */}
                          <button
                            onClick={() => {
                              setOpen(true);
                              console.log("Row ID", row.id);
                              setId(row.id);
                            }}
                          >
                            Review inspection <LuNotepadText className="icon" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              sx={{ fontFamily: "Poppins", fontSize: "14px" }}
              rowsPerPageOptions={[1, 10, 25, 100]}
              component="div"
              count={sortedFilteredData().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <InspectionPopUp open={open} onClose={handleClose} id={id}>
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
              <p>
                This is where you can show detailed info about the inspection.
              </p>
              <button onClick={handleClose}>Close</button>
            </Box>
          </InspectionPopUp>
        </>
      )}
    </>
  );
};

export default InspectionTable;

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./InspectionTable.css";
import { TiArrowUnsorted } from "react-icons/ti";
import { LuNotepadText } from "react-icons/lu";
import { HiDocumentReport } from "react-icons/hi";
import InspectionPopUp from "../InspectionPopUp/InspectionPopUp";
import Search from "../Search/Search";
import InspectionReport from "../InspectionReport/InspectionReport";

const InspectionTable = ({
  structureList,
  inspections,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [structureId, setStructureId] = useState(null);
  const [inspectionId, setInspectionId] = useState(null);

  useEffect(() => {
    if (inspections.length === 0 || structureList.length === 0) return;

    const displayData = inspections.map((inspection) => {
      const structure = structureList.find((structure) => structure.id === inspection.structureId);
      return {
        id: inspection.id,
        structureId: structure.id,
        code: structure.code,
        description: structure.name,
        inspectionType: inspection.inspectionType,
        inspectedBy: inspection.inspectorName,
        inspectionDate: inspection.inspectionDate,
      };
    });

    setData(displayData);
  }, [inspections, structureList]);

  const handleClose = () => setOpen(false);
  const handleReportClose = () => setReportOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedFilteredData = () => {
    let filteredData = data.filter(
      (item) =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Search setSearchTerm={setSearchTerm} />

      <>
        <div className="filter_container">
          <div className="completed-filter active">
            <p>
              Completed <span>({sortedFilteredData().length})</span>
            </p>
          </div>
        </div>

        <Paper className="paper-container">
          <TableContainer className="table-container">
            <Table stickyHeader aria-label="inspection table">
              <TableHead>
                <TableRow className="table-head">
                  {[
                    "code",
                    "description",
                    "inspection Type",
                    "inspected By",
                    "inspection Date",
                  ].map((key) => (
                    <TableCell
                      key={key}
                      onClick={() => requestSort(key)}
                      sx={{ minWidth: key === "code" ? "60px" : "150px" }}
                    >
                      <div className="table-title">
                        <TiArrowUnsorted className="icon" />
                        <div>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                      </div>
                    </TableCell>
                  ))}
                  <TableCell sx={{ minWidth: "200px" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {visibleRows.map((row, idx) => {
                  const myDate = new Date(row.inspectionDate);
                  const formattedDate = formatDate(myDate);

                  return (
                    <TableRow hover tabIndex={-1} key={idx}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.inspectionType}</TableCell>
                      <TableCell>{row.inspectedBy}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>
                        <div className="action-column">
                          <button
                            className="review-button"
                            onClick={() => {
                              setOpen(true);
                              setStructureId(row.structureId);
                              setInspectionId(row.id);
                            }}
                          >
                            Review inspection{" "}
                            <LuNotepadText className="icon" />
                          </button>
                          <button
                            className="report-button"
                            onClick={() => {
                              setReportOpen(true);
                              setStructureId(row.structureId);
                              setInspectionId(row.id);
                            }}
                          >
                            Generate Report{" "}
                            <HiDocumentReport className="icon" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            className="table-pagination"
            rowsPerPageOptions={[1, 10, 25, 100]}
            component="div"
            count={sortedFilteredData().length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <InspectionPopUp open={open} onClose={handleClose} inspectionId={inspectionId} structureId={structureId} />

        <InspectionReport
          open={reportOpen}
          onClose={handleReportClose}
          inspectionId={inspectionId}
          structureId={structureId}
          inspections={inspections}
          structureList={structureList}
        />
      </>
    </>
  );
};

export default InspectionTable;
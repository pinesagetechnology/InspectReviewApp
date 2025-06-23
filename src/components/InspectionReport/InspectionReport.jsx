import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";
import { FiX, FiDownload, FiPrinter } from "react-icons/fi";
import "./InspectionReport.css";
import assetApiService from "../../services/assetApiService";

const InspectionReport = ({ open, onClose, inspectionId, structureId, inspections, structureList }) => {
    const [inspectionData, setInspectionData] = useState(null);
    const [structureData, setStructureData] = useState(null);
    const [loadedPhotos, setLoadedPhotos] = useState({});

    useEffect(() => {
        if (inspectionId && structureId && inspections && structureList) {
            const inspection = inspections.find(insp => insp.id === inspectionId);
            const structure = structureList.find(struct => struct.id === structureId);
            setInspectionData(inspection);
            setStructureData(structure);
        }
    }, [inspectionId, structureId, inspections, structureList]);

    // Load photos when inspection data changes
    useEffect(() => {
        if (inspectionData?.maintenanceActions) {
            console.log("Inspection Data", inspectionData.maintenanceActions);
            loadPhotos();
        }
    }, [inspectionData]);

    const loadPhotos = async () => {
        const photosMap = {};
        
        for (const action of inspectionData.maintenanceActions) {
            if (action.photos && action.photos.length > 0) {
                const actionPhotos = [];
                for (const photo of action.photos) {
                    try {
                        if (photo.apiResponse?.id) {
                            const loadedPhoto = await assetApiService.getPhotos(photo.apiResponse.id);
                            actionPhotos.push({
                                url: loadedPhoto.url,
                                fileName: photo.fileName || loadedPhoto.name
                            });
                        }
                    } catch (error) {
                        console.error('Error loading photo:', error);
                        // Add a placeholder for failed photos
                        actionPhotos.push({
                            url: '',
                            fileName: photo.fileName || 'Failed to load image',
                            error: true
                        });
                    }
                }
                photosMap[action.elementCode] = actionPhotos;
            }
        }
        
        setLoadedPhotos(photosMap);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-').toUpperCase();
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Create a new window with the report content for downloading as PDF
        const printWindow = window.open('', '_blank');
        const reportContent = document.getElementById('inspection-report-content').innerHTML;

        printWindow.document.write(`
      <html>
        <head>
          <title>Bridge Inspection Report - ${structureData?.code || ''}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .report-header { text-align: center; margin-bottom: 30px; }
            .bridge-info { margin-bottom: 20px; }
            .inspection-details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .section-title { font-size: 16px; font-weight: bold; margin: 20px 0 10px 0; }
            .photos-section img { max-width: 300px; margin: 10px 0; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${reportContent}
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    };

    if (!inspectionData || !structureData) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose} className="report-modal">
            <Box className="report-modal-container">
                {/* Header */}
                <Box className="report-header no-print">
                    <Typography variant="h6">Bridge Inspection Report</Typography>
                    <Box className="header-actions">
                        <Button
                            startIcon={<FiPrinter />}
                            onClick={handlePrint}
                            variant="outlined"
                            size="small"
                        >
                            Print
                        </Button>
                        <Button
                            startIcon={<FiDownload />}
                            onClick={handleDownload}
                            variant="outlined"
                            size="small"
                        >
                            Download
                        </Button>
                        <IconButton onClick={onClose}>
                            <FiX />
                        </IconButton>
                    </Box>
                </Box>

                {/* Report Content */}
                <Box id="inspection-report-content" className="report-content">

                    {/* Report Title */}
                    <Box className="report-title">
                        <Typography variant="h4" align="center" gutterBottom>
                            BRIDGE INSPECTION REPORT - Level 2
                        </Typography>
                    </Box>

                    {/* Bridge Information */}
                    <Box className="bridge-info-section">
                        <Typography variant="h6" className="section-title">
                            Bridge Information
                        </Typography>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Bridge No:</strong></TableCell>
                                    <TableCell>{structureData.code}</TableCell>
                                    <TableCell><strong>Bridge Name:</strong></TableCell>
                                    <TableCell>{structureData.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Description:</strong></TableCell>
                                    <TableCell colSpan={3}>{structureData.description || structureData.name}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>

                    {/* Inspection Details */}
                    <Box className="inspection-details-section">
                        <Typography variant="h6" className="section-title">
                            Inspection Details
                        </Typography>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Level of Inspection:</strong></TableCell>
                                    <TableCell>{inspectionData.inspectionLevel}</TableCell>
                                    <TableCell><strong>Inspection Date:</strong></TableCell>
                                    <TableCell>{formatDate(inspectionData.inspectionDate)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Inspection Type:</strong></TableCell>
                                    <TableCell>{inspectionData.inspectionType}</TableCell>
                                    <TableCell><strong>Next Inspection:</strong></TableCell>
                                    <TableCell>{formatDate(inspectionData.nextInspectionProposedDate)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Temperature (°C):</strong></TableCell>
                                    <TableCell>{inspectionData.temperature}</TableCell>
                                    <TableCell><strong>Weather:</strong></TableCell>
                                    <TableCell>{inspectionData.weather}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Inspector's Name:</strong></TableCell>
                                    <TableCell>{inspectionData.inspectorName}</TableCell>
                                    <TableCell><strong>Engineer's Name:</strong></TableCell>
                                    <TableCell>{inspectionData.engineerName}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>

                    {/* Condition Ratings */}
                    <Box className="condition-ratings-section">
                        <Typography variant="h6" className="section-title">
                            Condition Rating of Elements
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Element Code</strong></TableCell>
                                        <TableCell><strong>Element Description</strong></TableCell>
                                        <TableCell align="center"><strong>Condition State 1</strong></TableCell>
                                        <TableCell align="center"><strong>Condition State 2</strong></TableCell>
                                        <TableCell align="center"><strong>Condition State 3</strong></TableCell>
                                        <TableCell align="center"><strong>Condition State 4</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inspectionData.conditionRatings?.map((rating, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{rating.elementCode}</TableCell>
                                            <TableCell>{rating.elementDescription}</TableCell>
                                            <TableCell align="center">{rating.ratings[0] || 0}</TableCell>
                                            <TableCell align="center">{rating.ratings[1] || 0}</TableCell>
                                            <TableCell align="center">{rating.ratings[2] || 0}</TableCell>
                                            <TableCell align="center">{rating.ratings[3] || 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* Required Maintenance Actions */}
                    <Box className="maintenance-actions-section">
                        <Typography variant="h6" className="section-title">
                            Required Maintenance Activities and Actions
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Elem Code</strong></TableCell>
                                        <TableCell><strong>MMS Act. No.</strong></TableCell>
                                        <TableCell><strong>MMS Activity Description</strong></TableCell>
                                        <TableCell><strong>Inspector's Comments</strong></TableCell>
                                        <TableCell align="center"><strong>Est Qty</strong></TableCell>
                                        <TableCell align="center"><strong>Date</strong></TableCell>
                                        <TableCell align="center"><strong>Prob (a)</strong></TableCell>
                                        <TableCell align="center"><strong>Cons (b)</strong></TableCell>
                                        <TableCell align="center"><strong>Inaction Risk</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inspectionData.maintenanceActions?.map((action, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{action.elementCode}</TableCell>
                                            <TableCell>{action.mmsActNo}</TableCell>
                                            <TableCell>{action.activityDescription}</TableCell>
                                            <TableCell>{action.inspectionComment}</TableCell>
                                            <TableCell align="center">{action.units}</TableCell>
                                            <TableCell align="center">{formatDate(action.dateForCompletion)}</TableCell>
                                            <TableCell align="center">{action.probability}</TableCell>
                                            <TableCell align="center">{action.consequenceOfInteraction}</TableCell>
                                            <TableCell align="center">{action.activityInactionRisk}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* Inspector's Comments */}
                    <Box className="comments-section">
                        <Typography variant="h6" className="section-title">
                            Inspector's Comments
                        </Typography>
                        <Box className="comments-content">
                            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                {inspectionData.comment || "No additional comments provided."}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Photos Section */}
                    {inspectionData.maintenanceActions?.some(action => action.photos && action.photos.length > 0) && (
                        <Box className="photos-section">
                            <Typography variant="h6" className="section-title">
                                Inspection Photos
                            </Typography>
                            {inspectionData.maintenanceActions.map((action, actionIndex) =>
                                action.photos && action.photos.length > 0 && loadedPhotos[action.elementCode] && (
                                    <Box key={actionIndex} className="action-photos">
                                        <Typography variant="subtitle1" style={{ marginTop: '20px', marginBottom: '10px' }}>
                                            <strong>{action.elementCode} - {action.activityDescription}</strong>
                                        </Typography>
                                        <Typography variant="body2" style={{ marginBottom: '10px', fontStyle: 'italic' }}>
                                            {action.inspectionComment}
                                        </Typography>
                                        <Box className="photos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                                            {loadedPhotos[action.elementCode].map((photo, photoIndex) => (
                                                <Box key={photoIndex} className="photo-item">
                                                    {photo.error ? (
                                                        <Box style={{
                                                            width: '100%',
                                                            maxWidth: '400px',
                                                            height: '200px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#f5f5f5',
                                                            color: '#666'
                                                        }}>
                                                            <Typography variant="body2">
                                                                {photo.fileName}
                                                            </Typography>
                                                        </Box>
                                                    ) : (
                                                        <img
                                                            src={photo.url}
                                                            alt={photo.fileName}
                                                            style={{
                                                                width: '100%',
                                                                maxWidth: '400px',
                                                                height: 'auto',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                    )}
                                                    <Typography variant="caption" display="block" style={{ marginTop: '5px', textAlign: 'center' }}>
                                                        {photo.fileName}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )
                            )}
                        </Box>
                    )}

                    {/* Report Footer */}
                    <Box className="report-footer" style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
                        <Typography variant="caption">
                            Report Generated on: {new Date().toLocaleDateString('en-GB')}
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Modal>
    );
};

export default InspectionReport;
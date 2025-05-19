import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './LogoutPopUp.css';

const LogoutPopUp = ({ open, onClose }) => {
  return (
    <Modal className='logoutpop-main-container' open={open} onClose={onClose}>
        <Box className="logoutpop-container" sx={{height: "100px",width: "300px", background: "#fff"}}>
            <Typography variant="h6" >
                Are you sure you want to log out?
            </Typography>
            <Box className="logoutpop-btns">
                <Button>Cancel</Button>
                <Button>Logout</Button>
            </Box>
        </Box>
    </Modal>
  )
}

export default LogoutPopUp
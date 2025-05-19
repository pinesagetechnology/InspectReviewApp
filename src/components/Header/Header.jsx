import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "../../redux/userSlice"; // Make sure you have logout action in your slice
import { IoIosArrowDown } from "react-icons/io";
import './Header.css'
import LogoutPopUp from "../LogoutPopUp/LogoutPopUp";
import Swal from "sweetalert2";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0].substring(0, 2).toUpperCase();
};

const Header = () => {
  const email = useSelector((state) => state.user.email);
  const [name, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleClose = () => setLogoutOpen(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/api/User/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const user = response.data.find((user) => user.email === email);
        if (user) {
          setUserName(user.name);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          Cookies.remove("token");
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [email, navigate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      backdrop: true,
      reverseButtons: true,
      width: "300px", // 👈 Smaller width
    });

    if (result.isConfirmed) {
      Cookies.remove("token");
      dispatch(logout());
      navigate("/");
    }
  };

  const handleNotificationSettings = () => {
    navigate("/notification-settings");
    handleMenuClose();
  };

  return (
    <>
    <AppBar className="appbar">
      <Toolbar className="tool-bar">
        <Typography
          className="main-title"
          variant="h6"
          onClick={() => navigate("/home", { replace: true })}
        >
          Bridge Inspection Application
        </Typography>
        <Box className="box-1">
          <Avatar className="user-circle">{getInitials(name)}</Avatar>
          <div className="dropdown-btn" onClick={handleMenuOpen}>
            <IoIosArrowDown className="icon" />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ marginTop: "15px" }}
          >
            {/* <MenuItem
              className="menu-item"
              onClick={handleNotificationSettings}
            >
              Notification Settings
            </MenuItem>
            <MenuItem className="menu-item" onClick={() => setLogoutOpen(true)}>
            </MenuItem> */}
            <MenuItem className="menu-item" onClick={() => setLogoutOpen(true)}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
      <LogoutPopUp open={logoutOpen} onClose={handleClose}></LogoutPopUp>
      </>
  );
};

export default Header;

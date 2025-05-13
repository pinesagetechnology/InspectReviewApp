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
import { logout } from "../redux/userSlice"; // Make sure you have logout action in your slice
import { IoIosArrowDown } from "react-icons/io";

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
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          Cookies.remove("token");
          navigate("/login");
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

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout()); // Reset Redux store
    navigate("/login");
  };

  const handleNotificationSettings = () => {
    alert("Notification settings clicked!");
    handleMenuClose();
  };

  return (
    <AppBar sx={{ backgroundColor: "#0066FF", boxShadow: "none" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins", fontSize: "16px", paddingLeft: "10px" }}
        >
          Bridge Inspection Application
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: "#fff",
              color: "#1976d2",
              fontWeight: "600",
              fontFamily: "Poppins",
              fontSize: "16px",
              alignItems: "center",
            }}
          >
            {getInitials(name)}
          </Avatar>
          <div style={{ cursor: "pointer" }} onClick={handleMenuOpen}>
            <IoIosArrowDown style={{ color: "#fff" }} />
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
            <MenuItem
              onClick={handleNotificationSettings}
              sx={{ fontFamily: "Poppins", fontSize: "14px" }}
            >
              Notification Settings
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{ fontFamily: "Poppins", fontSize: "14px" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

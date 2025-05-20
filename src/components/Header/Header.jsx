import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "../../redux/userSlice";
import { IoIosArrowDown } from "react-icons/io";
import "./Header.css";
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
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => setLogoutOpen(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    } else {
      setToken(token);
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
          setUserId(user.userId);
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

  const performLogout = async () => {
    try {
      const apiUrl = `https://ps-usermanagement-api-gufbchhve3gjawbe.centralus-01.azurewebsites.net/api/User/logout?userId=${userId}&accessToken=${token}`;

      await axios.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Cookies.remove("token");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire("Error", "Logout failed. Please try again.", "error");
    }
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
              <MenuItem
                className="menu-item"
                onClick={() => setLogoutOpen(true)}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <LogoutPopUp
        open={logoutOpen}
        onClose={handleClose}
        onConfirm={performLogout}
      />
    </>
  );
};

export default Header;

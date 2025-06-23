import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import "./css/LoginPage.css";
import userApiService from "../services/userApiService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remoteIpAddress, setRemoteIpAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's public IP
    const fetchIP = async () => {
      try {
        const data = await userApiService.getPublicIP();
        setRemoteIpAddress(data.ip);
      } catch (err) {
        console.error("Failed to fetch IP address", err);
      }
    };
    fetchIP();
  }, []);

  const handleLogin = async () => {
    // Validation: Check if fields are empty
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Enter all the valid fields",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await userApiService.login(email, password, remoteIpAddress);

      const { token, refreshToken } = response;
      userApiService.setTokens(token, refreshToken);

      dispatch(loginSuccess({ token, refreshToken, email }));
      navigate("/home", { replace: true });
    } catch (error) {
      // If login fails due to wrong credentials
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Enter valid credentials",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <Container maxWidth="xs" className="form-box" fullWidth>
          <Box className="form">
            <Typography variant="h1">Login</Typography>

            <div className="input-box">
              <input
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
            </div>

            <div className="input-box">
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>

            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;

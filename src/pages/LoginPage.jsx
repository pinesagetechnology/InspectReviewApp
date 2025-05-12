import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [remoteIpAddress, setRemoteIpAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/user/api/User/login",
        {
          email,
          password,
          remoteIpAddress,
        },
        { withCredentials: true }
      );

      const { token, refreshToken } = response.data;
      Cookies.set("token", token);
      Cookies.set("refreshToken", refreshToken);

      dispatch(loginSuccess({ token, refreshToken, email }));
      navigate("/home", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email, password, or remote IP address.",
      });
      console.error(error);
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

            <div className="input-box">
              <input
                placeholder="Remote IP"
                type="text"
                value={remoteIpAddress}
                onChange={(e) => setRemoteIpAddress(e.target.value)}
              />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="divider">
              <div className="line"></div>
              <span>or</span>
              <div className="line"></div>
            </div>

            <div className="register-link">
              <Typography variant="p">
                Don't have an account? <a href="#">Request access</a>
              </Typography>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import InspectionTable from "../components/InspectionTable/InspectionTable";
import Search from "../components/Search/Search";

const HomePage = () => {
  const email = useSelector((state) => state.user.email);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    // If no token, redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    // const fetchUserData = async () => {
    //   try {
    //     const response = await axios.get("/api/user/api/User/list", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       withCredentials: true,
    //     });

    //     const user = response.data.find((user) => user.email === email);
    //     console.log("User Data", user);
    //     if (user) {
    //       setUserName(user.name);
    //     }

    //     if (!user) {
    //       navigate("/login");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //     // Optional: redirect if token is invalid
    //     if (error.response?.status === 401) {
    //       Cookies.remove("token");
    //       navigate("/login");
    //     }
    //   }
    // };

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/inspect/api/Inspection/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const data = response.data;
        console.log("Particular Inspection", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optional: redirect if token is invalid
        if (error.response?.status === 401) {
          Cookies.remove("token");
          navigate("/login");
        }
      }
    };

    fetchData();
    // fetchUserData();
  }, [navigate]);

  return (
    <>
      <Header />
      <Search />
      <InspectionTable />
    </>
  );
};

export default HomePage;

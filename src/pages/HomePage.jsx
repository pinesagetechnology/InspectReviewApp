import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useState } from "react";
import InspectionTable from "../components/InspectionTable/InspectionTable";
import Search from "../components/Search/Search";
import {
  fetchInspectionListStart,
  fetchInspectionListSuccess,
  fetchInspectionListFailure,
} from "../redux/inspectionListSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      dispatch(fetchInspectionListStart());

      try {
        const response = await axios.get("/api/inspect/api/Inspection/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const data = response.data;
        dispatch(fetchInspectionListSuccess(data)); // Store in redux
        console.log("Particular Inspection", data);
      } catch (error) {
        dispatch(fetchInspectionListFailure(error.message));
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          Cookies.remove("token");
          navigate("/");
        }
      }
    };

    fetchData();
  }, [navigate, dispatch]);

  return (
    <>
      <Header />
      <InspectionTable />
    </>
  );
};

export default HomePage;

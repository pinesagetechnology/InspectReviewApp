import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import InspectionTable from "../components/InspectionTable/InspectionTable";
import {
  fetchInspectionListStart,
  fetchInspectionListSuccess,
  fetchInspectionListFailure,
} from "../redux/inspectionListSlice";
import {
  fetchStructuresStart,
  fetchStructuresSuccess,
  fetchStructuresFailure,
} from "../redux/dataStructureSlice";
import { useDispatch } from "react-redux";
import inspectionApiService from "../services/inspectionApiService";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const structureList = useSelector((state) => state.structure.structureList);
  const inspections = useSelector((state) => state.inspectionList.inspections);

  useEffect(() => {
    const token = inspectionApiService.getToken();

    if (!token) {
      navigate("/", { replace: true });
      console.log("Tokens not found");
      return;
    }

    const fetchInspectionData = async () => {
      dispatch(fetchInspectionListStart());

      try {
        const data = await inspectionApiService.getInspectionList();
        dispatch(fetchInspectionListSuccess(data)); // Store in redux
      } catch (error) {
        dispatch(fetchInspectionListFailure(error.message));
        if (error.response?.status === 401) {
          inspectionApiService.removeTokens();
          navigate("/", { replace: true });
        }
      }
    };

    const fetchStructureData = async () => {
      dispatch(fetchStructuresStart());
      try {
        const structureData = await inspectionApiService.getStructureList();
        dispatch(fetchStructuresSuccess(structureData));
      } catch (error) {
        dispatch(fetchStructuresFailure(error.message));
      }
    };

    fetchInspectionData();
    fetchStructureData();
  }, []);

  return (
    <>
      <Header />
      {
        (structureList.length === 0 && inspections.length === 0) ?
          <Loader /> :
          <InspectionTable 
            structureList={structureList}
            inspections={inspections}
          />
      }
    </>
  );
};

export default HomePage;

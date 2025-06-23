// redux/inspectionListSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inspections: [],
  loading: true,
  error: null,
};

const inspectionListSlice = createSlice({
  name: "inspectionList",
  initialState,
  reducers: {
    fetchInspectionListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInspectionListSuccess: (state, action) => {
      state.inspections = action.payload;
      state.loading = false;
    },
    fetchInspectionListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchInspectionListStart,
  fetchInspectionListSuccess,
  fetchInspectionListFailure,
} = inspectionListSlice.actions;

export default inspectionListSlice.reducer;

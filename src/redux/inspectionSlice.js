// redux/inspectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inspections: [],
  loading: false,
  error: null,
};

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    fetchInspectionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInspectionsSuccess: (state, action) => {
      state.inspections = action.payload;
      state.loading = false;
    },
    fetchInspectionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchInspectionsStart,
  fetchInspectionsSuccess,
  fetchInspectionsFailure,
} = inspectionSlice.actions;

export default inspectionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  structureList: [],
  loading: true,
  error: null,
};

const structureSlice = createSlice({
  name: "structures",
  initialState,
  reducers: {
    fetchStructuresStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStructuresSuccess: (state, action) => {
      state.structureList = action.payload;
      state.loading = false;
    },
    fetchStructuresFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStructuresStart,
  fetchStructuresSuccess,
  fetchStructuresFailure,
} = structureSlice.actions;

export default structureSlice.reducer;

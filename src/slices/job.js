import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    loading: true,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
  },
});

export const { setJobs } = jobSlice.actions;

export default jobSlice.reducer;

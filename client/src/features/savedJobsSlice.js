import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: {
    jobs: [],
  },
  reducers: {
    toggleSaveJob: (state, action) => {
      const exists = state.jobs.find((job) => job.id === action.payload.id);

      if (exists) {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload.id);
      } else {
        state.jobs.push(action.payload);
      }
    },
  },
});

export const { toggleSaveJob } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
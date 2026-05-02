import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import savedJobsReducer from "../features/savedJobsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,        // ✅ MUST
    savedJobs: savedJobsReducer,
  },
});
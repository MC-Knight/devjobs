import { configureStore } from "@reduxjs/toolkit";

//slices
import jobSlice from "../slices/job";

//apis
import { jobApi } from "../actions/jobs";

export const store = configureStore({
  reducer: {
    job: jobSlice,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

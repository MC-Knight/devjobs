import { configureStore } from "@reduxjs/toolkit";

//slices
import jobSlice from "../slices/job";
import userSlice from "../slices/user";

//apis
import { jobApi } from "../actions/jobs";
import { userApi } from "../actions/users";

export const store = configureStore({
  reducer: {
    job: jobSlice,
    user: userSlice,
    [jobApi.reducerPath]: jobApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware, userApi.middleware),
});

import { backend_url } from "../utils/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backend_url,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobs: builder.mutation({
      query: () => ({
        url: "/jobs",
        method: "GET",
      }),
    }),
    getJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
    }),
    addJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
    }),
    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
    }),
    addJobRequirement: builder.mutation({
      query: (data) => ({
        url: "/job-requirements",
        method: "POST",
        body: data,
      }),
    }),
    addJobRole: builder.mutation({
      query: (data) => ({
        url: "/job-role",
        method: "POST",
        body: data,
      }),
    }),
    updateJobRequirement: builder.mutation({
      query: (data) => ({
        url: "/job-requirements",
        method: "PUT",
        body: data,
      }),
    }),
    updateJobRole: builder.mutation({
      query: (data) => ({
        url: "/job-role",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetJobsMutation,
  useGetJobMutation,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useAddJobRequirementMutation,
  useAddJobRoleMutation,
  useUpdateJobRequirementMutation,
  useUpdateJobRoleMutation,
} = jobApi;

export default jobApi.reducer;

import PropTypes from "prop-types";
import { useJobsStore } from "./use-added-job";
import { createContext, useState, useEffect } from "react";

//mutation
import { useGetJobsMutation } from "../actions/jobs";

//slice
import { setJobs } from "../slices/job";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { addedJob } = useJobsStore();
  const dispatch = useDispatch();

  const [getJobsMutation, { isLoading }] = useGetJobsMutation();

  const getJobdHandler = async () => {
    const { data, error } = await getJobsMutation();

    if (error) {
      toast.error("Failed to fetch jobs");
    }

    if (data) {
      dispatch(setJobs(data));
    }
  };

  const { jobs } = useSelector((state) => state.job);
  const [jobsData, setJobsData] = useState(jobs);

  useEffect(() => {
    getJobdHandler();
  }, [addedJob]);

  useEffect(() => {
    setJobsData(jobs);
  }, [jobs]);

  return (
    <DashboardContext.Provider
      value={{
        jobs: jobsData,
        isLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

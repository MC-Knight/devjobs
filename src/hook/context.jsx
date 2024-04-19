import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

//mutation
import { useGetJobsMutation } from "../actions/jobs";

//slice
import { setJobs } from "../slices/job";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
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
  const [jobsLimit, setJobsLimit] = useState(9);

  useEffect(() => {
    getJobdHandler();
  }, []);

  useEffect(() => {
    setJobsData(jobs);
  }, [jobs]);

  useEffect(() => {
    const limitedData = jobs.slice(0, jobsLimit);
    setJobsData(limitedData);
  }, [jobsLimit, jobs]);

  function moreHandler() {
    setJobsLimit(jobsLimit + 6);
  }

  return (
    <HomeContext.Provider
      value={{
        data: jobs,
        jobs: jobsData,
        isLoading,
        moreHandler,
        jobsLimit,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from "prop-types";
import { useJobsStore } from "./use-added-job";
import { createContext, useState, useEffect } from "react";

//mutation
import { useGetJobsMutation } from "../actions/jobs";

//slice
import { setJobs } from "../slices/job";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
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
  const [jobsLimit, setJobsLimit] = useState(9);

  useEffect(() => {
    getJobdHandler();
  }, [addedJob]);

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

  const [searchTermLocation, setSearchTermLocation] = useState("");
  const [searchTermCompanyOrPosition, setSearchTermCompanyOrPosition] =
    useState("");

  const searchByLocation = (location) => {
    setSearchTermLocation(location);
  };

  const searchByCompanyOrPosition = (companyorPosition) => {
    setSearchTermCompanyOrPosition(companyorPosition);
  };

  useEffect(() => {
    const filteredJobs = jobs.filter(
      (job) =>
        (searchTermLocation
          ? job.location
              .toLowerCase()
              .includes(searchTermLocation.toLowerCase())
          : true) &&
        (searchTermCompanyOrPosition
          ? job.company
              .toLowerCase()
              .includes(searchTermCompanyOrPosition.toLowerCase()) ||
            job.position
              .toLowerCase()
              .includes(searchTermCompanyOrPosition.toLowerCase())
          : true)
    );
    setJobsData(filteredJobs);
  }, [searchTermLocation, searchTermCompanyOrPosition, jobs]);

  return (
    <HomeContext.Provider
      value={{
        data: jobs,
        jobs: jobsData,
        isLoading,
        moreHandler,
        jobsLimit,
        searchByLocation,
        searchByCompanyOrPosition,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

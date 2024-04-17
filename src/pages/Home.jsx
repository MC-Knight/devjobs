import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import data from "../assets/data/data";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

function Home() {
  const [dataItem, setDataItem] = useState([]);
  const [jobsLimit, setJobsLimit] = useState(9);

  useEffect(() => {
    const limitedData = data.slice(0, jobsLimit);
    setDataItem(limitedData);
  }, [jobsLimit]);

  function moreHanler() {
    setJobsLimit(jobsLimit + 6);
  }

  return (
    <div className="home">
      <div className="home-upper">
        <Logo />
        <SearchBar />
      </div>
      <div className="home-lower">
        <div className="home-lower-jobs">
          {dataItem.length > 0 &&
            dataItem.map((job) => <JobCard key={job.id} job={job} />)}
          {dataItem.length === 0 && <p>No Jobs at the moment</p>}
        </div>

        <div className="home-btn">
          <button
            onClick={moreHanler}
            style={{
              display: data.length > jobsLimit ? "block" : "none",
            }}
          >
            Load More
          </button>
          {data.length === jobsLimit ||
            (data.length < jobsLimit && <p>No more jobs to load</p>)}
        </div>
      </div>
    </div>
  );
}

export default Home;

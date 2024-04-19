import { useContext } from "react";
import JobCard from "../components/JobCard";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import { HomeContext } from "../hook/context";

function Home() {
  const { data, jobs, isLoading, moreHandler, jobsLimit } =
    useContext(HomeContext);

  return (
    <div className="home">
      <div className="home-upper">
        <Logo />
        <SearchBar />
      </div>
      <div className="home-lower">
        <div className="home-lower-jobs">
          {isLoading && <p>Loading...</p>}
          {jobs.length > 0 &&
            jobs.map((job) => <JobCard key={job.id} job={job} />)}
          {jobs.length === 0 && <p>No Jobs at the moment</p>}
        </div>

        {data.length > 0 && (
          <div className="home-btn">
            <button
              onClick={moreHandler}
              style={{
                display: data.length > jobsLimit ? "block" : "none",
              }}
            >
              Load More
            </button>
            {data.length === jobsLimit ||
              (data.length < jobsLimit && <p>No more jobs to load</p>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

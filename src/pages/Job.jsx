import Logo from "../components/Logo";
import data from "../assets/data/data";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Details from "../components/Details";

function Job() {
  let { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    const jobData = data.find((item) => item.id === parseInt(id));
    setJob(jobData);
  }, [id]);

  return (
    <div className="details-page">
      <div className="details-page-upper">
        <Logo />
      </div>
      <Details job={job} />
    </div>
  );
}

export default Job;

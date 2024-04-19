import Logo from "../components/Logo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Details from "../components/Details";
import toast from "react-hot-toast";

// mutation
import { useGetJobMutation } from "../actions/jobs";

function Job() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [job, setJob] = useState({});

  const [getJobMutation] = useGetJobMutation();

  const getJobHandler = async () => {
    const { data, error } = await getJobMutation(id);

    if (error) {
      toast.error("Failed to fetch job");
      navigate("/", { replace: true });
    }

    if (data) {
      setJob(data);
    }
  };

  useEffect(() => {
    getJobHandler();
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

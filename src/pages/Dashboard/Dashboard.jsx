import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { useModal } from "../../hook/use-modal-store";
import { JobItem, LoadingItem, NoItem } from "./JobItem";

//slice
import { logoutUser } from "../../slices/user";
import { DashboardContext } from "../../hook/dashboardContext";

function Dashboard() {
  const { onOpen } = useModal();

  const { authToken } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/home");
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!authToken) {
      dispatch(logoutUser());
      navigate("/", { replace: true });
    }

    if (authToken) {
      const isMyTokenExpired = isExpired(authToken);
      if (isMyTokenExpired) {
        dispatch(logoutUser());
        navigate("/", { replace: true });
      }

      const myDecodedToken = decodeToken(authToken);
      if (myDecodedToken.role !== "ADMIN") {
        dispatch(logoutUser());
        navigate("/home", { replace: true });
      }
    }
  }, []);

  const { jobs, isLoading } = useContext(DashboardContext);
  return (
    <div className="dashboard">
      <div className="dashboard-upper">
        <Logo />
      </div>

      <div className="dashboard-lower">
        <div className="dashboard-btn">
          <button onClick={() => onOpen("addNewJob")}>Add new Job</button>
          <button onClick={goHome}>Home</button>
          <button onClick={logoutHandler}>Logout</button>
        </div>

        <div className="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>Job Position</th>
                <th>Company name</th>
                <th>Location</th>
                <th>Contract</th>
                <th>Posted at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <LoadingItem />
              ) : jobs.length > 0 ? (
                jobs.map((job) => <JobItem key={job.id} job={job} />)
              ) : (
                <NoItem title="No Jobs at the moment" />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//slice
import { logoutUser } from "../../slices/user";

function Dashboard() {
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
      navigate("/", { replace: true });
      dispatch(logoutUser());
    }

    if (authToken) {
      const isMyTokenExpired = isExpired(authToken);
      if (isMyTokenExpired) {
        dispatch(logoutUser());
        navigate("/", { replace: true });
      }

      const myDecodedToken = decodeToken(authToken);
      if (myDecodedToken.role !== "ADMIN") {
        navigate("/home", { replace: true });
      }
    }
  }, [authToken, navigate, dispatch]);
  return (
    <div className="dashboard">
      <div className="dashboard-upper">
        <Logo />
      </div>

      <div className="dashboard-lower">
        <div className="dashboard-btn">
          <button>Add new Job</button>
          <button onClick={goHome}>Home</button>
          <button onClick={logoutHandler}>Logout</button>
        </div>

        <div className="dashboard-table">dashboard here</div>
      </div>
    </div>
  );
}

export default Dashboard;

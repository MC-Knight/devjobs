import { useNavigate } from "react-router-dom";
import notfound from "../assets/desktop/notfound.svg";

function NotFound() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home", { replace: true });
  };
  return (
    <div className="not-found">
      <img src={notfound} alt="not-found" />
      <h2>Not Found</h2>
      <button onClick={goHome}>back home</button>
    </div>
  );
}

export default NotFound;

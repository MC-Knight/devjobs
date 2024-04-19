import { Eye } from "lucide-react";
import logo from "../assets/desktop/logo.svg";

function Register() {
  return (
    <div className="login">
      <div className="login-left">
        <img src={logo} alt="" />
      </div>
      <div className="login-right">
        <h2>Register Here</h2>

        <form className="register-form ">
          <div className="input-group-2">
            <p>Firstname</p>
            <div className="input-group-container-2">
              <input type="text" placeholder="firstName" />
            </div>
          </div>

          <div className="input-group-2">
            <p>Lastname</p>
            <div className="input-group-container-2">
              <input type="text" placeholder="lastName" />
            </div>
          </div>

          <div className="input-group-2">
            <p>Email</p>
            <div className="input-group-container-2">
              <input type="text" placeholder="email" />
            </div>
          </div>

          <div className="input-group-2">
            <p>Password</p>
            <div className="input-group-container-2">
              <input type="password" placeholder="••••••••••••" />
              <Eye className="icon" />
            </div>
          </div>

          <button>Register</button>

          <div className="login-create-account">
            <p>
              already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

import { Eye } from "lucide-react";
import logo from "../assets/desktop/logo.svg";

function Login() {
  return (
    <div className="login">
      <div className="login-left">
        <img src={logo} alt="" />
      </div>
      <div className="login-right">
        <h2>Login to your Account</h2>

        <form>
          <div className="input-group">
            <p>Email</p>
            <div className="input-group-container">
              <input type="email" placeholder="main@gmail.com" />
            </div>
          </div>

          <div className="input-group">
            <p>Password</p>
            <div className="input-group-container">
              <input type="password" placeholder="••••••••••••" />
              <Eye className="icon" />
            </div>
          </div>

          <button>Login</button>

          <div className="login-create-account">
            <p>
              Don&apos;t have an account? <a href="/register">Create Account</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

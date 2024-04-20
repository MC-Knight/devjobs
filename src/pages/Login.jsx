import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/desktop/logo.svg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//mutation
import { useLoginUserMutation } from "../actions/users";

//slice
import { loginUser } from "../slices/user";

function Login() {
  const { authToken } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginUserMutation, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (loginData) => {
    const { data, error } = await loginUserMutation(loginData);

    if (error) {
      if (error.data) {
        if (error.data.message) {
          toast.error(error.data.message);
        } else if (error.data.error) {
          toast.error(error.data.error);
        }
      } else {
        toast.error("Something went wrong");
      }
    }

    if (data) {
      dispatch(loginUser(data));
      toast.success("Login successfully");
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [authToken, navigate]);
  return (
    <div className="login">
      <div className="login-left">
        <img src={logo} alt="" />
      </div>
      <div className="login-right">
        <h2>Login to your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <p>Email</p>
            <div className="input-group-container">
              <input
                type="email"
                placeholder="main@gmail.com"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && <span className="error">email is required</span>}
          </div>

          <div className="input-group">
            <p>Password</p>
            <div className="input-group-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                {...register("password", { required: true })}
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="icon"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(!showPassword)}
                  className="icon"
                />
              )}
            </div>
            {errors.password && (
              <span className="error">password is required</span>
            )}
          </div>

          <button type="submit">{isLoading ? "Loading..." : "login"}</button>

          <div className="login-create-account">
            <p>
              Don&apos;t have an account? <a href="/register">Create Account</a>
            </p>
          </div>

          <div className="login-create-account">
            <p>
              Or go <a href="/home">Home</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

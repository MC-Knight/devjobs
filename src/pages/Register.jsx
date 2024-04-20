import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/desktop/logo.svg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//mutation
import { useRegisterUserMutation } from "../actions/users";

function Register() {
  const { authToken } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUserMutation, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const onSubmit = async (loginData) => {
    const { data, error } = await registerUserMutation(loginData);

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
      toast.success(data.message);
      navigate("/", { replace: true });
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
        <h2>Register Here</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="input-group-2">
            <p>Firstname</p>
            <div className="input-group-container-2">
              <input
                type="text"
                placeholder="firstName"
                {...register("firstName", { required: true })}
              />
            </div>
            {errors.firstName && (
              <span className="error">firstName is required</span>
            )}
          </div>

          <div className="input-group-2">
            <p>Lastname</p>
            <div className="input-group-container-2">
              <input
                type="text"
                placeholder="lastName"
                {...register("lastName", { required: true })}
              />
            </div>
            {errors.lastName && (
              <span className="error">lastName is required</span>
            )}
          </div>

          <div className="input-group-2">
            <p>Email</p>
            <div className="input-group-container-2">
              <input
                type="text"
                placeholder="email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && <span className="error">email is required</span>}
          </div>

          <div className="input-group-2">
            <p>Password</p>
            <div className="input-group-container-2">
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

          <button type="submit">{isLoading ? "Loading..." : "Register"}</button>

          <div className="login-create-account">
            <p>
              already have an account? <a href="/">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

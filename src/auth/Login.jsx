import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

const Login = () => {
  const { refetch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://house-hounter-client.netlify.app/api/v1/users/login",
        data
      );
      localStorage.setItem("accessToken", response.data.token);

      if (response.data?.role === "House Owner") {
        navigate("/dashboard");
        toast.success("Login Successful");
      } else {
        navigate("/");
      }
      refetch();
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      toast.error("invalid user or password");
    } finally {
      setIsLoading(false);
    }
    reset();
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="card bg-teal-300 shadow-2xl p-6">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold ">Email</span>
                    <input
                      type="email"
                      className={`input input-bordered mt-1 p-2 ${
                        errors.email ? "input-error" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid Email",
                        },
                      })}
                    />
                  </label>
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <p className="label-text font-bold mr-0">Password</p>
                    <input
                      type="password"
                      className={`input input-bordered mt-1 p-2 ${
                        errors.password ? "input-error" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Must be 6 characters or longer",
                        },
                      })}
                    />
                  </label>
                  {errors.password && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button className="btn btn-primary btn-outline hover:text-white w-full mt-8">
                  Login
                </button>
                <h5 className="text-green-600 text-center mt-2">
                  Don not have an account?
                  <Link
                    className="ml-2 font-bold text-blue-700 text-xl"
                    to="/register"
                  >
                    Register
                  </Link>
                </h5>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

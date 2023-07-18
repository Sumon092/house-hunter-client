import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        data
      );
      console.log(response.data.status);
      if (data.status !== 200) {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Invalid email or password.");
      }
    }
    reset();
  };
  return (
    <div className="flex h-screen justify-center items-center bg-teal-500">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold text-white mb-6">
            Login
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Email</span>
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
                <p className="label-text text-lg text-white mr-0">Password</p>
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

            <button className="btn btn-info btn-outline hover:text-white w-full mt-8">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

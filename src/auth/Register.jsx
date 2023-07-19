
import { useForm } from "react-hook-form";
import "daisyui/dist/full.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        data
      );
      console.log(response.data.data.token);
      localStorage.setItem("accessToken", response.data.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "Email already exists. Please choose a different email."
        );
        toast.error("Email Already Exists");
      } else {
        console.log("Unhandled error occurred:", error);
      }
    }
    reset();
  };
  

  return (
    <div className="flex h-screen justify-center items-center bg-teal-500 pt-10 pb-10">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold text-white mt-0">
            Register
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Full Name</span>
                <input
                  type="text"
                  className={`input input-bordered mt-1 p-2 ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                />
              </label>
              {errors.fullName && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Role</span>
                <select
                  className={`select select-bordered mt-1 p-2 ${
                    errors.role ? "input-error" : ""
                  }`}
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="">Select Role</option>
                  <option value="House Owner">House Owner</option>
                  <option value="House Renter">House Renter</option>
                </select>
              </label>
              {errors.role && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.role.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">
                  Phone Number
                </span>
                <input
                  type="text"
                  className={`input input-bordered mt-1 p-2 ${
                    errors.phoneNumber ? "input-error" : ""
                  }`}
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
              </label>
              {errors.phoneNumber && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

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
                <span className="label-text text-lg text-white">Password</span>
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
              Register
            </button>
            <h5 className="text-blue text-center mt-2">
              Already have an account?
              <Link className="ml-2 text-white text-2xl" to="/login">
                Login
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
import { useForm } from 'react-hook-form';
import 'daisyui/dist/full.css';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    console.log(data);
    try {
        const response = await axios.post('http://localhost:5000/api/v1/users/register', data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    reset();
  };

  return (
    <div className="flex h-screen justify-center items-center bg-teal-500">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold text-white mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Full Name</span>
                <input
                  type="text"
                  className={`input input-bordered mt-1 p-2 ${
                    errors.fullName ? 'input-error' : ''
                  }`}
                  {...register('fullName', { required: 'Full Name is required' })}
                />
              </label>
              {errors.fullName && (
                <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Role</span>
                <select
                  className={`select select-bordered mt-1 p-2 ${errors.role ? 'input-error' : ''}`}
                  {...register('role', { required: 'Role is required' })}
                >
                  <option value="">Select Role</option>
                  <option value="House Owner">House Owner</option>
                  <option value="House Renter">House Renter</option>
                </select>
              </label>
              {errors.role && (
                <span className="text-red-500 text-xs mt-1">{errors.role.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Phone Number</span>
                <input
                  type="text"
                  className={`input input-bordered mt-1 p-2 ${
                    errors.phoneNumber ? 'input-error' : ''
                  }`}
                  {...register('phoneNumber', { required: 'Phone Number is required' })}
                />
              </label>
              {errors.phoneNumber && (
                <span className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Email</span>
                <input
                  type="email"
                  className={`input input-bordered mt-1 p-2 ${errors.email ? 'input-error' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Provide a valid Email',
                    },
                  })}
                />
              </label>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-white">Password</span>
                <input
                  type="password"
                  className={`input input-bordered mt-1 p-2 ${
                    errors.password ? 'input-error' : ''
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Must be 6 characters or longer',
                    },
                  })}
                />
              </label>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
              )}
            </div>

            <button className="btn btn-info btn-outline hover:text-white w-full mt-8">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;




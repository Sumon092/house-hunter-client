import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const Form = ({ handleModal }) => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    address: "",
    phoneNumber: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    picture: "",
    availabilityDate: "",
    rentPerMonth: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleModal(formData);
      setFormData(initialFormData);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to add house.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="text"
    //       placeholder="name"
    //       onChange={handleInputChange}
    //       {...register("name", {
    //         required: {
    //           value: true,
    //           message: "name is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.name?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.name?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>

    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       {...register("address", {
    //         required: {
    //           value: true,
    //           message: "address is Required",
    //         },
    //       })}
    //       type="text"
    //       placeholder="address"
    //       onChange={handleInputChange}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors.address?.type === "required" && (
    //         <span className="label-text-alt text-red-500">
    //           {errors.address.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       {...register("phoneNumber", {
    //         required: {
    //           value: true,
    //           message: "Phone number is Required",
    //         },
    //         pattern: {
    //           value: /^(\+?88)?01[0-9]{9}$/,
    //           message: "Provide a valid Bangladeshi Phone Number",
    //         },
    //       })}
    //       type="text"
    //       placeholder="Phone Number"
    //       onChange={handleInputChange}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors.phoneNumber?.type === "required" && (
    //         <span className="label-text-alt text-red-500">
    //           {errors.phoneNumber.message}
    //         </span>
    //       )}
    //       {errors.phoneNumber?.type === "pattern" && (
    //         <span className="label-text-alt text-red-500">
    //           {errors.phoneNumber.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>

    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="text"
    //       placeholder="city"
    //       onChange={handleInputChange}
    //       {...register("city", {
    //         required: {
    //           value: true,
    //           message: "City is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.city?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.city?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="number"
    //       placeholder="bedrooms"
    //       onChange={handleInputChange}
    //       {...register("bedrooms", {
    //         required: {
    //           value: true,
    //           message: "bedrooms is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.bedrooms?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.bedrooms?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="number"
    //       placeholder="bathrooms"
    //       onChange={handleInputChange}
    //       {...register("bathrooms", {
    //         required: {
    //           value: true,
    //           message: "bathrooms is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.bathrooms?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.bathrooms?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="text"
    //       placeholder="picture"
    //       onChange={handleInputChange}
    //       {...register("picture", {
    //         required: {
    //           value: true,
    //           message: "picture is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.picture?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.picture?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="date"
    //       placeholder="availabilityDate"
    //       onChange={handleInputChange}
    //       {...register("availabilityDate", {
    //         required: {
    //           value: true,
    //           message: "availabilityDate is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.availabilityDate?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.availabilityDate?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="number"
    //       placeholder="rentPerMonth"
    //       onChange={handleInputChange}
    //       {...register("rentPerMonth", {
    //         required: {
    //           value: true,
    //           message: "rentPerMonth is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.rentPerMonth?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.rentPerMonth?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="form-control w-full max-w-xs mx-auto">
    //     <input
    //       type="text"
    //       placeholder="description"
    //       onChange={handleInputChange}
    //       {...register("description", {
    //         required: {
    //           value: true,
    //           message: "description is required",
    //         },
    //       })}
    //       className="input input-bordered w-full max-w-xs"
    //     />
    //     <label className="label">
    //       {errors?.description?.type === "required" && (
    //         <span className="label-text-alt text-error">
    //           {errors?.description?.message}
    //         </span>
    //       )}
    //     </label>
    //   </div>
    //   <div className="w-full max-w-xs mx-auto">
    //     <input
    //       type="submit"
    //       value="submit"
    //       className="btn btn-success w-full"
    //     />
    //   </div>
    // </form>
    <form onSubmit={handleSubmit} className="max-w-xs flex flex-wrap">
      <div className="w-full">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="address"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 pr-2">
        <label
          htmlFor="city"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 pl-2">
        <label
          htmlFor="bedrooms"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Bedrooms:
        </label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 pr-2">
        <label
          htmlFor="bathrooms"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Bathrooms:
        </label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 pl-2">
        <label
          htmlFor="roomSize"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Room Size:
        </label>
        <input
          type="text"
          id="roomSize"
          name="roomSize"
          value={formData.roomSize}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="picture"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Picture:
        </label>
        <input
          type="text"
          id="picture"
          name="picture"
          value={formData.picture}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 pr-2">
        <label
          htmlFor="availabilityDate"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Availability Date:
        </label>
        <input
          type="date"
          id="availabilityDate"
          name="availabilityDate"
          value={formData.availabilityDate}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 pl-2">
        <label
          htmlFor="rentPerMonth"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Rent Per Month:
        </label>
        <input
          type="number"
          id="rentPerMonth"
          name="rentPerMonth"
          value={formData.rentPerMonth}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="phoneNumber"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          Add House
        </button>
      </div>
    </form>
  );
};

export default Form;

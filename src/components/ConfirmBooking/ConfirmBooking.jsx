import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const ConfirmBooking = () => {
  const { houseId } = useParams();
  const { data, refetch } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    houseRenterId: "",
  });

  useEffect(() => {
    if (data) {
      const { fullName, email, phoneNumber, _id } = data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: fullName,
        email: email,
        phoneNumber: phoneNumber,
        houseRenterId: _id,
      }));
    }
  }, [data]);

  const handleAddBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://house-hounter-client.netlify.app/api/v1/renters/addBooking`,
        { ...formData, houseId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json",
          },
        }
      );
      console.log(data, "data from booking");
      if (data && data?.rentedBookingCount >= 2) {
        toast.error("You can booked maximum two house");
        return;
      }
      toast.success("Booking Successful");
      refetch();
      if (data.status == 500) {
        return toast.error("House Already Booked");
      }
      navigate("/");
    } catch (error) {
      toast.error("Failed to create booking");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-center flex-col">
      <h1 className="mt-24 text-2xl font-bold text-center">
        Confirm Order Please
      </h1>
      <div className="flex flex-center mx-auto mt-2">
        <form
          onSubmit={handleAddBooking}
          className="max-w-xs flex flex-wrap flex-center"
        >
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
              required
              readOnly
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              readOnly
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
              required
              readOnly
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="hidden">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              houseId:
            </label>
            <input
              type="text"
              id="houseId"
              name="houseId"
              value={houseId}
              required
              readOnly
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="hidden">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              House RenterId:
            </label>
            <input
              type="text"
              id="houseRenterId"
              name="houseRenterId"
              value={formData.houseRenterId}
              required
              readOnly
              className="none w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 d-"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 mt-4"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmBooking;

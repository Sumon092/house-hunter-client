import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import { toast } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const UpdateModal = ({ house, refetch }) => {
  const [showModal, setShowModal] = useState(false);

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
  useEffect(() => {
    if (house) {
      setFormData(house);
    }
  }, [house]);
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        // eslint-disable-next-line react/prop-types
        `https://house-hounter-server.vercel.app/owners/updateHouse/${house._id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json",
          },
        }
      );
      toast.success("Update Successful");
      setShowModal(false);
      refetch();
    } catch (error) {
      throw new Error("Failed to update");
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="update-modal"
        className="modal-toggle"
        checked={showModal}
        onChange={() => setShowModal(!showModal)}
      />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="update-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500 text-white"
          >
            ✕
          </label>
          <h1 className="text-xl font-bold text-center my-2 text-info p-2">
            Update House
          </h1>
          <form onSubmit={handleUpdate} className="max-w-xs flex flex-wrap">
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
                Update House
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [ownedHouses, setOwnedHouses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    bedrooms: 0,
    bathrooms: 0,
    roomSize: "",
    picture: "",
    availabilityDate: "",
    rentPerMonth: 0,
    phoneNumber: "",
    description: "",
  });

  const fetchOwnedHouses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/owners/houses"
      );
      setOwnedHouses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOwnedHouses();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/houses", formData);
      const newHouse = response.data;
      setOwnedHouses([...ownedHouses, newHouse]);
      setFormData({
        name: "",
        address: "",
        city: "",
        bedrooms: 0,
        bathrooms: 0,
        roomSize: "",
        picture: "",
        availabilityDate: "",
        rentPerMonth: 0,
        phoneNumber: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (houseId) => {
    try {
      await axios.delete(`/api/v1/houses/${houseId}`);
      setOwnedHouses(ownedHouses.filter((house) => house._id !== houseId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 mt-12 text-center">
        Owned Houses
      </h1>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Address</th>
            <th className="p-4">City</th>
            <th className="p-4">Bedrooms</th>
            <th className="p-4">Bathrooms</th>
            <th className="p-4">Room Size</th>
            <th className="p-4">Availability Date</th>
            <th className="p-4">Rent per Month</th>
            <th className="p-4">Phone Number</th>
            <th className="p-4">Description</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ownedHouses.map((house) => (
            <tr key={house._id}>
              <td className="p-4">{house.name}</td>
              <td className="p-4">{house.address}</td>
              <td className="p-4">{house.city}</td>
              <td className="p-4">{house.bedrooms}</td>
              <td className="p-4">{house.bathrooms}</td>
              <td className="p-4">{house.roomSize}</td>
              <td className="p-4">{house.availabilityDate}</td>
              <td className="p-4">{house.rentPerMonth}</td>
              <td className="p-4">{house.phoneNumber}</td>
              <td className="p-4">{house.description}</td>
              <td className="p-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  onClick={() => handleDelete(house._id)}
                >
                  Delete
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl font-bold mt-8 mb-4">Add New House</h2>
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

        <div className="w-full">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            Add House
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;

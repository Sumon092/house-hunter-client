import { useState} from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import UpdateModal from "../../components/Modal/UpdateModal";
import { useQuery } from "react-query";


const Dashboard = () => {
  
  const [house,setHouse] = useState([]);

  
  const { data:houses} = useQuery("houses", () =>
    fetch(`http://localhost:5000/api/v1/owners/houses`).then((res) =>
      res.json()
    )
  );
  const handleDelete = async (houseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/owners/deleteHouse/${houseId}`);
      console.log('house deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 mt-12 text-center">
        Owned Houses
      </h1>
      {/* <div className="">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            Add House
          </button>
        </div> */}
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
          {houses?.map((house) => (
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
      <label
              htmlFor="house-modal"
              className="btn btn-sm btn-success text-white font-bold mt-2"
            >
              Add New House
            </label>
            <Modal></Modal>
            <UpdateModal house={house} setHouse={setHouse}></UpdateModal>
    </div>
  );
};

export default Dashboard;

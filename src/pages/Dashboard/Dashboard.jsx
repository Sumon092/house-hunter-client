import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import UpdateModal from "../../components/Modal/UpdateModal";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

const Dashboard2 = () => {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [owners,setOwners]=useState({})
  
  // !
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  
    try {
      axios
        .get("https://house-hounter-server.vercel.app/users/user")
        .then((response) => {
          setOwners(response.data);
        })
        .catch((error) => {
          console.error("Error fetching owners data:", error);
        });
    } catch (error) {
      console.error("Error fetching owners data:", error);
    }
  }, []);
  
  const houseOwner= owners.ownedHouses
  console.log(houseOwner);
  // !
  
  const { data, refetch ,isLoading} = useQuery("houses", () =>
  
    fetch(`https://house-hounter-server.vercel.app/owners/houses`).then((res) =>
      res.json()
    )
  );
  useEffect(() => {
    if (data) {
      const ownedHouseIds = owners?.ownedHouses || [];
      const filteredHouses = data.filter((house) =>
      ownedHouseIds.includes(house._id)
    );
      setHouses(filteredHouses);
    }
  }, [owners,data]);

  refetch()
  
  
  const handleDelete = async (houseId) => {
    try {
      await axios.delete(
        `https://house-hounter-server.vercel.app/owners/deleteHouse/${houseId}`
      );
      
    } catch (error) {
      throw new Error("delete denied")
    }
    refetch();
    toast.error("House Deleted")
  };
  const handleEdit = (house) => {
    setSelectedHouse(house);
  };

  return (
    <div className="p-4 mt-24">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-3xl font-bold text-center flex-1">Owned Houses</h1>
        <div className="flex">
          <label
            htmlFor="house-modal"
            className="btn btn-lg btn-primary text-white font-bold mb-4"
          >
            Add New House
          </label>
          <Modal refetch={refetch}></Modal>
        </div>
      </div>
      {isLoading ? <Loading />:( <table className="w-full bg-white border border-gray-200">
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
                  className="bg-red-500 text-white p-1 px-2 rounded w-20 mb-2"
                  onClick={() => handleDelete(house._id)}
                >
                  Delete
                </button>
                <label
                  htmlFor="update-modal"
                  onClick={() => handleEdit(house)}
                  className="btn btn-sm py-2 px-4  text-white font-bold mr-2 bg-blue-500"
                >
                  
                  Edit
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
     
      {selectedHouse && (
        <UpdateModal
          house={selectedHouse}
          setHouse={setHouses}
          refetch={refetch}
        />
      )}
    </div>
  );
};
export default Dashboard2;
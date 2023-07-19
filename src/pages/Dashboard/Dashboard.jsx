import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import UpdateModal from "../../components/Modal/UpdateModal";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading/Loading";
import formatDate from "../../components/FormatDate/FormatDate";

const Dashboard2 = () => {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [owners, setOwners] = useState({});

  // !
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    try {
      axios
        .get("https://house-hounter-client.netlify.app/api/v1/users/user")
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

  // !

  const { data, refetch, isLoading } = useQuery("houses", () =>
    fetch(`https://house-hounter-client.netlify.app/api/v1/owners/houses`).then((res) =>
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
  }, [owners, data]);

  refetch();

  const handleDelete = async (houseId) => {
    console.log(houseId, "houseId");
    try {
      await axios.delete(
        `https://house-hounter-client.netlify.app/api/v1/owners/deleteHouse/${houseId}`
      );
    } catch (error) {
      throw new Error("delete denied");
    }
    refetch();
    toast.error("House Deleted");
  };
  const handleEdit = (house) => {
    setSelectedHouse(house);
  };

  return (
    <div className="p-4 mt-16">
      <span className="block text-sm text-error mx-auto text-center mt-0 mb-4">
        House owners can not book house,want to book? create account as a
        renter
      </span>
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-3xl font-bold text-center flex-start">Owned Houses</h1>
        <div className="flex">
          <label
            htmlFor="house-modal"
            className="btn btn-md btn-error text-white font-bold mb-4"
          >
            Add New House
          </label>
          <Modal refetch={refetch}></Modal>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-full  border border-gray-300 rounded block p-4">
          <thead>
            <tr>
              <th className="p-2 ">Name</th>
              <th className="p-2">Address</th>
              <th className="p-2">City</th>
              <th className="p-2">Bedrooms</th>
              <th className="p-2">Bathrooms</th>
              <th className="p-2">Room Size</th>
              <th className="p-2">Availability Date</th>
              <th className="p-2">Rent per Month</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody >
            {houses?.map((house) => (
              <tr key={house._id} className="border border-gray-300 rounded">
                <td className="p-2">{house.address}</td>
                <td className="p-2">{house.city}</td>
                <td className="p-2">{house.name}</td>
                <td className="p-2">{house.bedrooms}</td>
                <td className="p-2">{house.bathrooms}</td>
                <td className="p-2">{house.roomSize}</td>
                <td className="p-2">{formatDate(house.availabilityDate)}</td>
                <td className="p-2">{house.rentPerMonth}</td>
                <td className="p-2">{house.phoneNumber}</td>
                <td className="p-2">{house.description}</td>
                <td className="p-2">
                  <div className="flex justify-between">
                    <div>
                    <button
                    className="bg-red-500 text-white p-1 px-2 rounded w-20"
                    onClick={() => handleDelete(house._id)}
                  >
                    Delete
                  </button>
                    </div>
                    <div className="ml-2">
                    <label
                    htmlFor="update-modal"
                    onClick={() => handleEdit(house)}
                    className="btn btn-sm py-2 px-4  text-white font-bold bg-blue-500"
                  >
                    Edit
                  </label>
                    </div>
                  </div>
                 
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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

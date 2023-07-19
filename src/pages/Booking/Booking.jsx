import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [houses, setHouses] = useState([]);

  const handleCancel = async (bookingIdToDelete) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/renters/cancel-booking/${bookingIdToDelete}`);
      toast.error("Booking cancelled");
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingIdToDelete)
      );
      refetch();
    } catch (error) {
      throw new Error("Cancel denied");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
    axios
      .get("http://localhost:5000/api/v1/renters/booked")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
  }, []);

  const bookedHouseIds = useMemo(() => {
    return bookings.length > 0 ? bookings.map((bookedHouse) => bookedHouse.houseId) : [];
  }, [bookings]);

  const { data, refetch, isLoading, isError } = useQuery("houses", () =>
    fetch("http://localhost:5000/api/v1/owners/houses").then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const bookedHousesData = data.filter((house) => bookedHouseIds.includes(house._id));
      setHouses(bookedHousesData);
    }
  }, [data, bookedHouseIds]);

  useEffect(() => {
    refetch();
  }, [refetch, bookings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div className="mt-24">
      <h2 className="text-2xl text-center font-bold mb-4">Booked Houses</h2>

      {houses.length === 0 ? (
        <p className="text-2xl text-center font-bold">No houses booked yet.</p>
      ) : (
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
            {houses.map((house) => (
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
                    onClick={() => handleCancel(bookedHouseIds)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Booking;

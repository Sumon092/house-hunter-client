import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useAuth();
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    bedrooms: "",
    bathrooms: "",
    roomSize: "",
    availability: "",
    rentPerMonth: "",
  });

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/owners/houses"
      );
      setHouses(response.data);
    } catch (error) {
      throw new Error("Error");
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  const filterHouses = () => {
    let filteredHouses = houses;

    if (filters.city) {
      filteredHouses = filteredHouses.filter((house) =>
        house.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.bedrooms) {
      filteredHouses = filteredHouses.filter(
        (house) => house.bedrooms.toString() === filters.bedrooms
      );
    }

    if (filters.bathrooms) {
      filteredHouses = filteredHouses.filter(
        (house) => house.bathrooms.toString() === filters.bathrooms
      );
    }

    if (filters.roomSize) {
      filteredHouses = filteredHouses.filter((house) =>
        house.roomSize.toLowerCase().includes(filters.roomSize.toLowerCase())
      );
    }

    if (filters.availability) {
      filteredHouses = filteredHouses.filter(
        (house) => house.availabilityDate === filters.availability
      );
    }

    if (filters.rentPerMonth) {
      filteredHouses = filteredHouses.filter(
        (house) => house.rentPerMonth <= parseInt(filters.rentPerMonth)
      );
    }

    return filteredHouses;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleBookingSubmit = (houseId) => {
    try {
      console.log("houseId...", houseId);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container mx-auto p-12 mt-8">
      <h1 className="text-3xl font-bold mb-4">Houses for Rent</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label htmlFor="city" className="block text-gray-700">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-36 sm:w-48 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="bedrooms" className="block text-gray-700">
                Bedrooms:
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-16 sm:w-24 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="bathrooms" className="block text-gray-700">
                Bathrooms:
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                className="w-16 sm:w-24 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="roomSize" className="block text-gray-700">
                Room Size:
              </label>
              <input
                type="text"
                id="roomSize"
                name="roomSize"
                value={filters.roomSize}
                onChange={handleFilterChange}
                className="w-36 sm:w-48 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="availability" className="block text-gray-700">
                Availability Date:
              </label>
              <input
                type="date"
                id="availability"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="w-36 sm:w-48 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="rentPerMonth" className="block text-gray-700">
                Rent Per Month:
              </label>
              <input
                type="number"
                id="rentPerMonth"
                name="rentPerMonth"
                value={filters.rentPerMonth}
                onChange={handleFilterChange}
                className="w-16 sm:w-24 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 mt-2"
          >
            Apply Filters
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white">
        {filterHouses().map((house) => (
          <div
            key={house._id}
            className="bg-slate-300 rounded-lg shadow-2xl p-4"
          >
            <h2 className="text-xl font-bold mb-2">{house?.name}</h2>
            <div className="mb-4">
              <img
                src={house?.picture}
                alt={house?.name}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <p className="text-gray-700 mb-2">
              {house?.address}, {house.city}
            </p>
            <p className="text-gray-700 mb-2">Bedrooms: {house?.bedrooms}</p>
            <p className="text-gray-700 mb-2">Bathrooms: {house?.bathrooms}</p>
            <p className="text-gray-700 mb-2">Room Size: {house?.roomSize}</p>
            <p className="text-gray-700 mb-2">
              Availability Date: {house?.availabilityDate}
            </p>
            <p className="text-gray-700 mb-2">
              Rent Per Month: {house?.rentPerMonth}
            </p>
            <p className="text-gray-700 mb-2">
              Phone Number: {house?.phoneNumber}
            </p>
            <p className="text-gray-700 mb-2">{house?.description}</p>
            {house.booked ? (
              <Link className="btn btn-error btn-sm">Booked House</Link>
            ) : (
              <Link
                to={`/confirm-booking/${house._id}`}
                onClick={() => handleBookingSubmit({ houseId: house._id })}
                className="btn btn-secondary btn-sm"
                disabled={data?.role === "House Owner"}
              >
                Book House
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

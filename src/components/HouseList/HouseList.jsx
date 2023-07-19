import { useEffect, useState } from "react";
import fetchHouses from "../FetchHouse/FetchHouses";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import formatDate from "../FormatDate/FormatDate";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

const HouseList = () => {
  const { data, isLoading } = useAuth();
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const queryParameters = {
      city,
      bedrooms,
      bathrooms,
      roomSize,
      availabilityDate,
      minRent,
      maxRent,
      page: currentPage,
      limit: 10,
    };

    fetchHouses(queryParameters)
      .then((data) => {
        setHouses(data);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch houses", error.message);
        setLoading(false);
      });
  }, [
    availabilityDate,
    bathrooms,
    bedrooms,
    city,
    maxRent,
    minRent,
    roomSize,
    currentPage,
  ]);

  //   const handleSearch = () => {
  //     setLoading(false);
  //   };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="container mx-auto mt-16 p-8">
      <h1 className="text-2xl font-bold mb-4 uppercase">
        Find Your Dream House
      </h1>

      <div className="border border-gray-300 p-2 rounded">
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col flex-grow">
            <label htmlFor="city" className="block font-bold mb-1">
              City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="bedrooms" className="block font-bold mb-1">
              Bedrooms:
            </label>
            <div className="relative">
              <select
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full appearance-none focus:outline-none focus:border-blue-500"
              >
                <option value={0}>Any</option>
                <option value={1}>1 Room</option>
                <option value={2}>2 Rooms</option>
                <option value={3}>3 Rooms</option>
                <option value={4}>4 Rooms</option>
                <option value={5}>5 Rooms</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="bedrooms" className="block font-bold mb-1">
              Bedrooms:
            </label>
            <div className="relative">
              <select
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full appearance-none focus:outline-none focus:border-blue-500 bg-white text-gray-900"
              >
                <option value={0}>Any</option>
                <option value={1}>1 Bath Room</option>
                <option value={2}>2 Bath Rooms</option>
                <option value={3}>3 Bath Rooms</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="bathrooms" className="block font-bold mb-1">
              Room Size:
            </label>
            <input
              type="string"
              id="roomSize"
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="bathrooms" className="block font-bold mb-1">
              Availability Date:
            </label>
            <input
              type="date"
              id="availabilityDate"
              value={availabilityDate}
              onChange={(e) => setAvailabilityDate(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2 md:w-1/3 sm:1/2">
          <div className="">
            <label htmlFor="minRent" className="block font-bold mb-1">
              Minimum Rent:
            </label>
            <input
              type="number"
              id="minRent"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
              placeholder="Enter min rent"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
          <div className="">
            <label htmlFor="maxRent" className="block font-bold mb-1">
              Maximum Rent:
            </label>
            <input
              type="number"
              id="maxRent"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              placeholder="Enter max rent"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
        </div>

        <div className="flex justify-start mt-2">
          <button
            // onClick={handleSearch}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded focus:outline-none`}
          >
            {loading ? "Filtering House..." : "Apply Filter"}
          </button>
        </div>

        {loading && <div>Loading...</div>}

        {error && <div>Error: {error}</div>}
      </div>

      <h2 className="text-xl font-bold mb-4 mt-4 uppercase">
        List of Houses for rent
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white">
          {houses.map((house) => (
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
              <p className="text-gray-700 mb-2">
                Bathrooms: {house?.bathrooms}
              </p>
              <p className="text-gray-700 mb-2">Room Size: {house?.roomSize}</p>
              <p className="text-gray-700 mb-2">
                Availability Date: {formatDate(house?.availabilityDate)}
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (data.role === "House Owner") {
                      toast.error(
                        "House owners cannot book houses, create a Renter Account"
                      );
                      return;
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Book House
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HouseList;

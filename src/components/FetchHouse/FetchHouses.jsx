import axios from "axios";

const fetchHouses = async ({
  city,
  bedrooms,
  bathrooms,
  roomSize,
  availability,
  minRent,
  maxRent,
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await axios.get(`https://house-hounter-client.netlify.app/api/v1/owners/houses`, {
      params: {
        city,
        bedrooms,
        bathrooms,
        roomSize,
        availability,
        minRent,
        maxRent,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch houses:", error);
    throw new Error("Failed to fetch houses");
  }
};

export default fetchHouses;

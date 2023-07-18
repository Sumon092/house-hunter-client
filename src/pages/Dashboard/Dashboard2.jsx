// import { useState, useEffect } from "react";
// import axios from "axios";
// import OwnedHouses from "./OwnedHouses";

// const Dashboard = () => {
//   const [completeHouseData, setCompleteHouseData] = useState([]);

//   useEffect(() => {
//     // Fetch ownedHouses data from the API and store it in state
//     axios.get("https://house-hounter-server.vercel.app/users/user")
//       .then((response) => {
//         // Extract house IDs from ownedHouses and fetch complete house data for each ID
//         const houseIds = response.data.ownedHouses.map((house) => house._id);
//         fetchCompleteHouseData(houseIds);
//         console.log(houseIds);
//       })
//       .catch((error) => {
//         console.error("Error fetching ownedHouses data:", error);
//       });
//   }, []);

//   const fetchCompleteHouseData = (houseIds) => {
//     // Fetch complete house data for each house ID
//     const promises = houseIds.map((houseId) =>
//       axios.get(`https://house-hounter-server.vercel.app/houses/${houseId}`)
//     );

//     Promise.all(promises)
//       .then((responses) => {
//         // Store the complete house data in state
//         const completeHouseData = responses.map((response) => response.data);
//         setCompleteHouseData(completeHouseData);
//       })
//       .catch((error) => {
//         console.error("Error fetching complete house data:", error);
//       });
//   };

//   return (
//     <div>
//       {/* Render other components or content here */}
//       <OwnedHouses ownedHouses={completeHouseData} />
//     </div>
//   );
// };

// export default Dashboard;


const Dashboard2 = () => {
    return (
        <div>
            
        </div>
    );
};

export default Dashboard2;

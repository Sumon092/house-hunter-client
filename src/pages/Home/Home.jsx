// import { useState } from "react";
// import { useQuery } from "react-query";

// const Home = () => {
//   const [pageCount, setPageCount] = useState(0);
//   const [page, setPage] = useState(0);
//   const [limit, setLimt] = useState(10);
//   const { data, isLoading, refetch } = useQuery(["house", page, limit], () =>
//     fetch(
//       `http://localhost:5000/api/v1/owners/houses?page=${page}&size=${limit}`
//     ).then((res) => res.json())
//   );
//   return (
//     <div>
//        <div className="overflow-x-auto">
//         <table className="table table-compact w-full">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Address</th>
//               <th>City</th>
//               <th>Bedroom</th>
//               <th>Bathroom</th>
//               <th>Room Size</th>
//               <th>Picture</th>
//               <th>AvailabilityDate</th>
//               <th>Phone Number</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((bill) => (
//               <Rows
//                 bill={bill}
//                 key={bill._id}
//                 isLoading={isLoading}
//                 refetch={refetch}
//                 setBill={setBill}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Home;


const Home = () => {
  return (
    <div>
      <h1 className="text-white text-center">This is home</h1>
    </div>
  );
};

export default Home;

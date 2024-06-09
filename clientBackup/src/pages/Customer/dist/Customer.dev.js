// import React, { useState, useEffect } from 'react';
// import usersService from '../../services/users';
// import '../Customer/Customer.css';
// function Customer() {
//   const [loading, setLoading] = useState(true);
//   const [bikes, setBikes] = useState([]);
//   useEffect(() => {
//     fetchBikes();
//   }, []);
//   const fetchBikes = async () => {
//     try {
//       const response = await usersService.bikeList();
//       setBikes(response);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch bikes:', error.message);
//       setLoading(false);
//     }
//   };
//   const handleBookClick = (bikeId) => {
//     // Handle booking logic here
//     console.log(`Booking bike with ID: ${bikeId}`);
//   };
//   return (
//     <div>
//       <h1>Bikes Available for Customer</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="bike-container">
//           {bikes.map((bike) => (
//             <div key={bike._id} className="bike-card">
//               <h2>{bike.name}</h2>
//               <p>Type: {bike.type}</p>
//               <p>Price: ${bike.price}</p>
//               <p>Available: {bike.available ? 'Yes' : 'No'}</p>
//               <img src={bike.image} alt={bike.name} className="bike-image" />
//               {bike.luggageOptions.length > 0 && (
//                 <div>
//                   <h3>Luggage Options:</h3>
//                   <ul>
//                     {bike.luggageOptions.map((option, index) => (
//                       <li key={option._id}>
//                         {option.name} - {option.description} - ${option.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <button onClick={() => handleBookClick(bike._id)}>Book Now</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// export default Customer;
"use strict";
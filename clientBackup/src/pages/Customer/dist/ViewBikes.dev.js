// import './ViewBikes.css';
// import { useState, useEffect } from 'react';
// import bikesService from '../../services/bikes';
// import { useParams } from 'react-router-dom';
// import { Form } from 'react-bootstrap';
// const ViewBikes = () => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [bike, setBike] = useState(null); // Initialize state as null instead of an empty array
//   const [selectedOption, setSelectedOption] = useState('');
//   const [pickUp,setPickUp] = useState('')
//   useEffect(() => {
//     const fetchBikes = async () => {
//       try {
//         const response = await bikesService.getBikeById(id);
//         setBike(response);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch bike:', error.message);
//         setLoading(false);
//         setError(true);
//       }
//     };
//     fetchBikes();
//   }, [id]);
//   useEffect(() => {
//     const fetchBikes = async () => {
//       try {
//         const response = await bikesService.bookBike();
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch bike:', error.message);
//         setLoading(false);
//         setError(true);
//       }
//     };
//     fetchBikes();
//   }, []);
//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };
//   console.log(selectedOption)
//   return (
//     <div className="productscreen">
//       {loading ? (
//         <h2>Loading...</h2>
//       ) : error ? (
//         <h2>Error: Failed to fetch bike</h2>
//       ) : bike ? (
//         <>
//           <div className="productscreen__left">
//             <div className="left__image">
//               <img src={bike.image} alt={bike.name} />
//             </div>
//             <div className="left__info">
//               <p className="left__name">{bike.name}</p>
//               <p>Price: ₹{bike.price}</p>
//             </div>
//           </div>
//           <div className="productscreen__right">
//             <div className="right__info">
//               <p>Price: <span>₹{bike.price}</span></p>
//               <Form.Select onChange={handleOptionChange} value={selectedOption}>
//                 <option>Select Luggage Option</option>
//                 {bike.luggageOptions.map(option => (
//                   <option key={option._id} value={option._id}>
//                     {option.name} - ₹{option.price}
//                   </option>
//                 ))}
//               </Form.Select>
//               <p><button type="button">Book</button></p>
//             </div>
//           </div>
//         </>
//       ) : (
//         <h2>No bike found</h2>
//       )}
//     </div>
//   );
// };
// export default ViewBikes;
"use strict";
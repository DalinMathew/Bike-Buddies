// // TripManagement.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './TripManagement.css'

// import {useSelector} from 'react-redux'

// const TripManagement = () => {
//   const user = useSelector((state) => state?.auth?.user);
//   const [trips, setTrips] = useState([]);
//   const [customer, setCustomer] = useState([]);
//   const [booking, setBooking] = useState([]);
//   const [bike, setBike] = useState([]);

//   // const navigate = useNavigate();

//     useEffect(() => {
//       fetchTrips();
//     }, []);

//     const fetchTrips = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/trips/gettrips");
//         // console.log(response.data)
//         setTrips(response.data.trips);
//         setCustomer(response.data.user);
//         setBooking(response.data.booking);
//         setBike(response.data.bike);
//       } catch (error) {
//         console.error("Error fetching trips:", error);
//       }
//     };
//     let trip_Id = ''
//     if(trips && trips._id){
//       trip_Id = trips._id
//     }
//     else{
//       trip_Id= ''
//     }
//     let riderId = ''
//     if(user && user._id){
//       riderId = user._id;
//     }
//     else{
//       riderId = ''
//     }
//     console.log(riderId)

//     const handleCancel = async (bookingId,tId) => {
//       try {
//         await axios.put(`http://localhost:9000/rider/${bookingId}/reject`, { status: 'rejected' });
//           await axios.put(`http://localhost:9000/trips/trips/${tId}/status`, {
//             status:'rejected',
//             riderId:riderId
//           });
//         // fetchBookingRequests();
//       } catch (error) {
//         console.error('Error rejecting booking:', error);
//       }
//     };

//     const completeTrip = async (tripId, status) => {
//       // console.log(tripId,status)
//       try {
//         await axios.put(`http://localhost:9000/trips/trips/${tripId}/status`, {
//           status:'Completed',
//           riderId:riderId
//         });
//         // Optionally, you can update the UI to reflect the updated trip status
//         fetchTrips();
//       } catch (error) {
//         console.error("Error updating trip status:", error);
//       }
//     };
    
//   console.log(booking);
//   // console.log(bike)
//   console.log(trips)

//   return (
  
//   <div className="trip-management">
//   <h1>Trip Management</h1>
//   <h4 className="booking-history-heading">Booking History</h4>
//   <ul className="booking-history-list">
//     {booking.map((bookingItem) => {

//       const selectedBike = bike.find((bikeItem) => bikeItem.rider === riderId);
//       // console.log(selectedBike) 
//       const associatedTrip = trips.find((trip) => trip.rider === bookingItem.rider);
//       console.log(associatedTrip)
//       const today = new Date()
//       const isoString = today.toISOString();
//       // console.log(isoString.slice(0,10),bookingItem.tripDate.slice(0,10))
//       // console.log(isoString.slice(0,10) == bookingItem.tripDate.slice(0,10) )
//       // console.log(associatedTrip && associatedTrip.status === 'ongoing')
//       if(bookingItem.rider == riderId ){
//       return (
//         <li key={bookingItem.id} className="booking-item">
//           {/* Display Booking Status */}
//           <img src={selectedBike && selectedBike.image?selectedBike.image:""}></img>
//           <p className="booking-status">Booking Status: {bookingItem.status}</p>
//           {/* Display Trip Status */}
//           {associatedTrip && (
//             <p className="trip-status">Trip Status: {associatedTrip.status}</p>
//           )}
//           <p className="trip-date">Trip Date: {bookingItem.tripDate}</p>
//           <p className="trip-duration">Trip Duration: {bookingItem.tripDuration}</p>
//           {/* Display Bike Information */}
//           {selectedBike && (
//             <div className="bike-details">
//               <p className="bike-name">Bike Name: {selectedBike.name}</p>
//               {/* Display other bike information as needed */}
//             </div>
//           )}
//           {/* Button to Complete Trip */}
//           {/* {associatedTrip && associatedTrip.status === 'ongoing'&& isoString.slice(0,10) == bookingItem.tripDate.slice(0,10) ? (
//             <button onClick={() => completeTrip(associatedTrip._id, associatedTrip.status)} type="button" className="complete-trip-button">Complete Trip</button>
//           ) : (
//             (associatedTrip.status !== 'Completed')?
//             // <p>{bookingItem._id}</p>:<></>
//             <button onClick={() => handleCancel(bookingItem._id,associatedTrip._id)}  type="button" className="complete-trip-button">Cancel Trip</button>:<></>
//           )} */}
//         </li>
//       );
//     }})}
//   </ul>
//   {/* <BookingRequestView /> */}
// </div>


//   );
// };

// export default TripManagement;










import React, { useState, useEffect } from "react";
import axios from "axios";
import './TripManagement.css';
import { useSelector } from 'react-redux';

const TripManagement = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [trips, setTrips] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bike, setBike] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      fetchTrips(user._id);
    }
  }, [user]);

  const fetchTrips = async (riderId) => {
    try {
      const response = await axios.get(`http://localhost:9000/trips/history/${riderId}`);
      if(response.data.message){
        alert(response.data.message)
      }else{
      setTrips(response.data.trips);
      setCustomer(response.data.user);
      setBooking(response.data.booking);
      setBike(response.data.bike);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleCancel = async (bookingId, tripId) => {
    try {
      await axios.put(`http://localhost:9000/rider/${bookingId}/reject`, { status: 'rejected' });
      await axios.put(`http://localhost:9000/trips/trips/${tripId}/status`, {
        status: 'rejected',
        riderId: user._id
      });
      fetchTrips(user._id);  // Refresh the trips data after canceling
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  const completeTrip = async (tripId) => {
    try {
      await axios.put(`http://localhost:9000/trips/trips/${tripId}/status`, {
        status: 'Completed',
        riderId: user._id
      });
      fetchTrips(user._id);  // Refresh the trips data after completing
    } catch (error) {
      console.error("Error updating trip status:", error);
    }
  };

  const today = new Date();
  const isoString = today.toISOString().slice(0, 10);

  return (
    <div className="trip-management">
      <h1>Trip Management</h1>
      <h4 className="booking-history-heading">Booking History</h4>
      <ul className="booking-history-list">
        {booking.map((bookingItem) => {
          // console.log(bookingItem._id)
          const selectedBike = bike.find((bikeItem) => bikeItem._id === bookingItem.bike);
          const associatedTrip = trips.find((trip) => trip.bookingId === bookingItem._id );
          const associatedCustomer = customer.find((cust) => cust._id === bookingItem.customer);

          // console.log(associatedCustomer)

          if (user && user._id ?bookingItem.rider === user._id:'' ) {
            return (
              <li key={bookingItem._id} className="booking-item">
                {/* Display Booking Status */}
                <img width='350px' src={`http://localhost:9000/media/${selectedBike && selectedBike.image ? selectedBike.image : ""}`} alt="Bike" />
                <p className="booking-status">Booking Status: {bookingItem.status}</p>
                {/* Display Trip Status */}
                {associatedTrip && (
                  <p className="trip-status">Trip Status: {associatedTrip.status}</p>
                )}
                <p className="trip-date">Trip Date: {bookingItem.tripDate}</p>
                <p className="trip-duration">Trip Duration: {bookingItem.tripDuration}</p>
                {/* Display Bike Information */}
                {selectedBike && (
                  <div className="bike-details">
                    <p className="bike-name">Bike Name: {selectedBike.name}</p>
                    {/* Display other bike information as needed */}
                  </div>
                )}
                {associatedCustomer && (
                  <div className="bike-details">
                    <p className="bike-name">Customer Name: {associatedCustomer.name}</p>
                    <p className="bike-name">Customer Mobile: {associatedCustomer.mobile}</p>
                    <p className="bike-name">Customer Email: {associatedCustomer.email}</p>

                    {/* Display other bike information as needed */}
                  </div>
                )}
                {/* Button to Complete Trip */}
                {associatedTrip && associatedTrip.status === 'ongoing' && isoString === bookingItem.tripDate.slice(0, 10) ? (
                  <button onClick={() => completeTrip(associatedTrip._id)} type="button" className="complete-trip-button">Complete Trip</button>
                ) : (
                  associatedTrip && associatedTrip.status !== 'Completed' && associatedTrip && associatedTrip.status !== 'rejected' && (
                    <button onClick={() => handleCancel(bookingItem._id, associatedTrip._id)} type="button" className="complete-trip-button">Cancel Trip</button>
                  )
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default TripManagement;

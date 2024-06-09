import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./BookingRequestView.css";

const BookingRequestView = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bike, setBike] = useState([]);
  const user = useSelector((state) => state?.auth?.user);
  let riderId = "";
  if (user && user._id) {
    riderId = user._id;
  } else {
    riderId = "";
  }

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:9000/rider/");
      setCustomers(response.data.customers);
      setBookingRequests(response.data.bookings);
      setBike(response.data.bikes);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
    }
  };

  const handleAccept = async (bookingId, customerId) => {
    try {
      await axios.put(`http://localhost:9000/rider/${bookingId}/accept`, {
        status: "accepted",
        riderId,
      });
      await axios.post(`http://localhost:9000/trips/trips`, {
        status: "ongoing",
        riderId,
        customerId,
        bookingId,
      });
      alert("The request has been accepted");
      fetchBookingRequests();
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axios.put(`http://localhost:9000/rider/${bookingId}/reject`, {
        status: "rejected",
      });
      fetchBookingRequests();
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Welcome {user?.name || "Rider"}</h2>{" "}
      {/* Show the name of the logged-in rider */}
      {bookingRequests.length === 0 ? (
        <p>No new booking requests for you at this moment</p>
      ) : (
        bookingRequests.map((booking) => {
          const associatedcustomers = customers.find(
            (cust) => cust._id === booking.customer
          );
          const associatedBike = bike.find((bike) => bike._id === booking.bike);
          if (booking.rider == riderId) {
            return (
              <div className="booking-card" key={booking.id}>
                <div className="booking-card-header">
                  <img
                    src={`http://localhost:9000/media/${
                      associatedBike && associatedBike.image
                        ? associatedBike.image
                        : ""
                    }`}
                    alt={bike.name}
                  />
                </div>
                <div className="booking-card-body">
                  <p>
                    <strong>Customer Name:</strong>{" "}
                    {associatedcustomers && associatedcustomers.name
                      ? associatedcustomers.name
                      : ""}
                  </p>
                  <p>
                    <strong>Customer Email:</strong>{" "}
                    {associatedcustomers && associatedcustomers.email
                      ? associatedcustomers.email
                      : ""}
                  </p>
                  <p>
                    <strong>Customer Mobile:</strong>{" "}
                    {associatedcustomers && associatedcustomers.mobile
                      ? associatedcustomers.mobile
                      : ""}
                  </p>
                  <p>
                    <strong>Customer Age:</strong>{" "}
                    {associatedcustomers && associatedcustomers.age
                      ? associatedcustomers.age
                      : ""}
                  </p>
                  <p>
                    <strong>Pick Up Location:</strong> {booking.pickUpLocation}
                  </p>
                  <p>
                    <strong>Destination:</strong> {booking.destination}
                  </p>
                  <p>
                    <strong>Trip Duration:</strong> {booking.tripDuration}
                  </p>
                  <p>
                    <strong>Luggage Option:</strong> {booking.luggageOption}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.tripDate}
                  </p>
                </div>
                <div className="booking-card-footer">
                  <button
                    onClick={() => handleAccept(booking._id, booking.customer)}
                  >
                    Accept
                  </button>
                  <button onClick={() => handleReject(booking._id)}>
                    Reject
                  </button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  );
};

export default BookingRequestView;

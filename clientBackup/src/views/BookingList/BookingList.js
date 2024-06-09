import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './BookingList.css'; // Import a CSS file for styling

function BookingList() {
    const [allData, setAllData] = useState([]);

    const getAllBookings = async () => {
        try {
            const response = await axios.get('http://localhost:9000/rider/all');
            console.log(response);
            setAllData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllBookings();
    }, []);

    return (
        <div className="dashboard-container">
            {allData.length === 0 ? (
                <p>Loading...</p>
            ) : (
                allData.map((booking, index) => (
                    <div key={index} className="booking-card">
                        <div className="details">
                            <div className="detail-section">
                                <h3>Bike Details</h3>
                                <p><strong>Name:</strong> {booking.bike.name}</p>
                                <p><strong>Type:</strong> {booking.bike.type}</p>
                                <p><strong>Price:</strong> ${booking.bike.price}</p>
                                <img src={`http://localhost:9000/media/${booking.bike.image}`} alt={booking.bike.name} className="bike-image" />
                            </div>
                            <div className="detail-section">
                                <h3>Customer Details</h3>
                                <p><strong>Name:</strong> {booking.customer.name}</p>
                                <p><strong>Age:</strong> {booking.customer.age}</p>
                                <p><strong>Email:</strong> {booking.customer.email}</p>
                                <p><strong>Mobile:</strong> {booking.customer.mobile}</p>
                            </div>
                            <div className="detail-section">
                                <h3>Rider Details</h3>
                                <p><strong>Name:</strong> {booking.rider.name}</p>
                                <p><strong>Age:</strong> {booking.rider.age}</p>
                                <p><strong>Email:</strong> {booking.rider.email}</p>
                                <p><strong>Mobile:</strong> {booking.rider.mobile}</p>
                            </div>
                            <div className="detail-section">
                                <h3>Trip Details</h3>
                                <p><strong>Pick Up Location:</strong> {booking.pickUpLocation}</p>
                                <p><strong>Destination:</strong> {booking.destination}</p>
                                <p><strong>Trip Date:</strong> {booking.tripDatel}</p>
                                <p><strong>Trip Duration:</strong> {booking.tripDuration}</p>
                            </div>
                        </div>
                        <p><strong>Status:</strong> {booking.status}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default BookingList;

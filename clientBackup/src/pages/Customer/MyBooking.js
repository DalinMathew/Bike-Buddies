import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './MyBooking.css'
import RadioGroupRating from '../../components/Rating/Rating';
import {Form,Button} from 'react-bootstrap'
import bikesService from '../../services/bikes';

export default function MyBooking() {

    const [data, setData] = useState([]);
    const [bikes,setBikes] = useState([])
    const [Rider,setRider] = useState([])
    const [completed,setCompleted] = useState([])
    const [rating, setRating] = useState(2); // Initialize state to the default value

    const [comment, setComment] = useState(''); // State for comment
    


    const user = useSelector((state) => state?.auth?.user);
    let custId = '';
    if (user && user._id) {
        custId = user._id;
    } else {
        custId = '';
    }
    console.log(custId)

    useEffect(() => {
        fetchTrips();
    }, []);
    const handleRatingChange = (newValue) => {
      setRating(newValue); // Update state with the new value selected by the user
    };
    console.log(data)



    const fetchTrips = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/customer/booking/${custId}`);
            if(response.data.message){
              alert("No bookings found")
            }
            else{
              console.log(response)
              setData(response.data.availableBikes);
              setBikes(response.data.Bikes);
              setRider(response.data.Rider);
              setCompleted(response.data.completedTrip)

            }

        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };
    // let isCompleted = ''
    // if(completed && completed.status){
    //   isCompleted = completed.status
    // }else{
    //   console.log('')
    // }

    // let riderId = ''
    // if(bikes && bikes[0]){
    //   riderId = bikes[0].rider
    // }
    // else{
    //   riderId = ''
    // }

    const handleFeedbackSubmit = async (riderId,destination,tripdate) => {
      // e.preventDefault(); // Preventing default form submission behavior

      try {
        // Performing validation - ensuring required fields are filled
        if (!riderId || !rating || !comment) {
          console.error('Please fill in all required fields');
          return;
        }


        // Creating feedback object with input values
        const feedbackData = {
          riderId: riderId,
          customerId: custId, // Assuming userId is defined elsewhere
          rating: rating,
          comment: comment,
          role:user.role,
          destination:destination,
          tripdate:tripdate
        };

        // Making API call to create feedback
        const response = await bikesService.createFeedback(feedbackData);
        alert('Feedback submitted successfully'); // Alerting user upon successful submission
      } catch (error) {
        console.error('Failed to submit feedback:', error.message);
      }
    };







    console.log(completed)
    return (
        <div className="my-bookings">
  <h2>My Bookings</h2>
  <ul className="booking-list">
    {data.map((booking, index) => {
      const associatedBike = bikes.find((bike) => bike._id === booking.bike);
      console.log(associatedBike)
      const associatedRider = Rider.find((rider) => rider._id === associatedBike.rider);
      const associatedCompletion = completed.find((stats) => stats.bookingId == booking._id )
      console.log(associatedCompletion)
      
      const number = `https://wa.me/${associatedRider && associatedRider.mobile ? associatedRider.mobile : ""}`
      return (
        <li key={index} className="booking-item">
          <div className="booking-details">
            <div className="booking-image">
              <img src={`http://localhost:9000/media/${associatedBike &&  associatedBike.image? associatedBike.image:''}`} alt="Bike" />
            </div>
            <div className="booking-info">
              <p className="rider-name">Rider Name: {associatedRider && associatedRider.name ? associatedRider.name : ""}</p>
              <p className="rider-email">Rider Email: {associatedRider && associatedRider.email ? associatedRider.email : ""}</p>
              <p className="rider-mobile">Rider Mobile: <a href={number}>{associatedRider && associatedRider.mobile ? associatedRider.mobile : ""}</a></p>
              <p className="pickup-location">Pick Up Location: {booking.pickUpLocation}</p>
              <p className="pickup-location">Destination : {booking.destination}</p>
              <p className="pickup-location">Trip Status : {associatedCompletion && associatedCompletion.status?associatedCompletion.status:booking.status == 'accepted'? 'Accepted':'Pending'}</p>

              <p className="trip-date">Trip Date: {booking.tripDate}</p>
              <p className="booking-status">Booking Status: {booking.status}</p>
              <p className="trip-duration">Trip Duration: {booking.tripDuration}</p>
              {associatedCompletion && associatedCompletion.status == 'Completed'?(
                <>
                <h3>Hey Your Trip is Completed</h3>
                <h3>Rate Your Ride</h3>
              <RadioGroupRating value = {rating} onChange={handleRatingChange} />
              <Form onSubmit={()  =>handleFeedbackSubmit(associatedCompletion.rider,booking.destination,booking.tripDate)}>
                          <Form.Group className="mb-3" controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </Form.Group>
            
                          <Button variant="primary" type="submit">
                            Submit Feedback
                          </Button>
                        </Form> 
                        </>
              ):(
                <></>
              )}
            </div>
          </div>
        </li>
      );
    })}
  </ul>
  {/* {isCompleted == 'Completed'?( */}
  {/* {completed.map((comp => {
    // asoRider = Rider.find((rider => ))
    return(
      <><p>{comp.status}</p></>
    )
  }))} */}
    {/* <> */}
    {/* <h3>Hey Your Trip is Completed</h3>
    <h3>Rate Your Ride</h3>
  <RadioGroupRating value = {rating} onChange={handleRatingChange} />
  <Form onSubmit={handleFeedbackSubmit}>
              <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit Feedback
              </Button>
            </Form>  */}
            {/* </> */}
  {/* ):(
    <></>
  )} */}
        </div>
    );
}

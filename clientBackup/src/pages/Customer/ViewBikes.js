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

import "./ViewBikes.css";
import { useState, useEffect } from "react";
import bikesService from "../../services/bikes";
import { useParams,useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewBikes = () => {
  const history = useHistory();
  const user = useSelector((state) => state?.auth?.user);
  let userId = user._id;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bike, setBike] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [destination,setDestination] = useState("")


  // const [riderId, setRiderId] = useState(''); // State for rider ID
  const [rating, setRating] = useState(''); // State for rating
  const [comment, setComment] = useState(''); // State for comment
  let riderId = ''
  if(bike && bike.rider){
    riderId = bike.rider
  }
  else{
    riderId = ''
  }

  // const handleFeedbackSubmit = async (e) => {
  //   e.preventDefault(); // Preventing default form submission behavior

  //   try {
  //     // Performing validation - ensuring required fields are filled
  //     if (!riderId || !rating || !comment) {
  //       console.error('Please fill in all required fields');
  //       return;
  //     }


  //     // Creating feedback object with input values
  //     const feedbackData = {
  //       riderId: riderId,
  //       customerId: userId, // Assuming userId is defined elsewhere
  //       rating: rating,
  //       comment: comment
  //     };

  //     // Making API call to create feedback
  //     const response = await bikesService.createFeedback(feedbackData);
  //     alert('Feedback submitted successfully'); // Alerting user upon successful submission
  //   } catch (error) {
  //     console.error('Failed to submit feedback:', error.message);
  //   }
  // };


  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await bikesService.getBikeById(id);
        setBike(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bike:", error.message);
        setLoading(false);
        setError(true);
      }
    };

    fetchBikes();
  }, [id]);
  let luggageOption = 0
  if(bike && bike.luggageOptions){
    luggageOption=bike.luggageOptions
  }
  console.log(bike)

  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  const handleBookClick = async () => {
    try {
      // Ensure all required fields are filled
      if (!selectedOption || !pickUp || !tripDate || !tripDuration) {
        console.error("Please fill in all required fields");
        return;
      }

      // Perform booking logic here using pickUp, tripDate, tripDuration, and selectedOption
      console.log("Booking bike:", bike._id);
      console.log("Selected option:", selectedOption);
      console.log("Pick Up Location:", pickUp);
      console.log("Trip Date:", tripDate);
      console.log("Trip Duration:", tripDuration);

      // Call the booking API with the necessary data
      const bookingData = {
        riderId:riderId,
        customerId: userId,
        bikeId: bike._id,
        pickUpLocation: pickUp,
        destination:destination,
        tripDate: tripDate,
        tripDuration: tripDuration,
        luggageOption: selectedOption,
      };

      // Make the API call to book the bike
      const response = await bikesService.bookBike(bookingData);

      alert("Bike booked successfully");
      history.push('/app/bookings')
      setLoading(false);
    } catch (error) {
      console.error("Failed to book bike:", error.message);
      setLoading(false);
      setError(true);
    }
  };
  const showImage = (image) =>{
    return(
      <>
      <a href={image} title={'title'} >
          <button type="button"  alt={'title'}  >Show Rider Id Proof</button>{" "}
        </a>
        </>      
        // <a title='preview' href={`http://localhost:9000/media/${user.photo2}`}></a>
    )
  }


  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error: Failed to fetch bike</h2>
      ) : bike ? (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img width={'400px'} height={'300px'} src={`http://localhost:9000/media/${bike.image}`} alt={bike.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{bike.name}</p>
              <p>Description : {bike.description}</p>
              <p>Price: ₹{bike.price}</p>
              {showImage(`http://localhost:9000/media/${bike.riderIdPRoof}`)} 
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price: <span>₹{bike.price}</span>
              </p>
              {/* <Form.Select onChange={handleOptionChange} value={selectedOption}>
                <option>Select Luggage Option</option>
                {bike.luggageOptions.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name} - ₹{option.price}
                  </option>
                ))}
              </Form.Select> */}
              <p>Max LuggageOption is : {luggageOption}</p>
              <Form.Control
                style={{ marginTop: "20px" }}
                type="text"
                placeholder="Luggage"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <Form.Control
                style={{ marginTop: "20px" }}
                type="text"
                placeholder="Pick Up Location"
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
              />
              <Form.Control
                style={{ marginTop: "20px" }}
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <Form.Control
                style={{ marginTop: "20px" }}
                type="date"
                placeholder="Trip Date"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
              />
              <Form.Control
                style={{ marginTop: "20px" }}
                type="text"
                placeholder="Trip Duration"
                value={tripDuration}
                onChange={(e) => setTripDuration(e.target.value)}
              />

              <Button variant="primary" onClick={handleBookClick}>
                Book
              </Button>
            </div>
            {/* <Form onSubmit={handleFeedbackSubmit}>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </Form.Group>

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
            </Form> */}
          </div>
        </>
      ) : (
        <h2>No bike found</h2>
      )}
    </div>
  );
};

export default ViewBikes;

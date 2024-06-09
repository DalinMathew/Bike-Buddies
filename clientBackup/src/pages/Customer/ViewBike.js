// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Form, Input, Card, Button, Avatar } from 'antd';
// import ImageUploader from 'react-images-upload';
// import axios from 'axios';
// import { editProfile } from '../../reducers/authReducer';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.auth?.user);
//   console.log(user);

//   const role = user?.role || '';
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [mobile, setMobile] = useState(user.mobile);
//   const [userName, setUserName] = useState(user.username);
//   const [photo, setPhoto] = useState(user.photo);
//   const [photo2, setPhoto2] = useState();

//   const [bikeDetails, setBikeDetails] = useState(user.bikeDetails);
//   const [availability, setAvailability] = useState(user.availability);
//   const [rates, setRates] = useState(user.rates);
//   const [active, setActive] = useState(true);

//   const onNameChange = (txt) => {
//     setName(txt.target.value);
//   };
//   const onEmailChange = (txt) => {
//     setEmail(txt.target.value);
//   };
//   const onUserNameChange = (txt) => {
//     setUserName(txt.target.value);
//   };
//   const onMobileChange = (txt) => {
//     setMobile(txt.target.value);
//   };

//   const onsave = () => {
//     dispatch(
//       editProfile({
//         name: name,
//         email: email,
//         username: userName,
//         mobile: mobile,
//         photo: photo,
//         photo2: photo2,
//         bikeDetails: bikeDetails,
//         availability: availability,
//         rates: rates,
//       })
//     );
//   };

//   const uploadFileToServer = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.url;
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       return null;
//     }
//   };

//   const onFileChange = async (event) => {
//     const file = event[0];
//     const fileUrl = await uploadFileToServer(file);
//     setPhoto(fileUrl);
//     setActive(false);
//   };

//   const onFileChange1 = async (event) => {
//     const file = event[0];
//     const fileUrl = await uploadFileToServer(file);
//     setPhoto2(fileUrl);
//     setActive(false);
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-body">
//           <div className="avatar">
//             <Avatar size="large" src={user.photo} />
//           </div>
//           <h5 className="card-title">{user.name}</h5>
//           <h5 className="card-text">{'@' + user.username}</h5>
//           <p className="card-text">
//             {user.email}
//             <br />
//             <span className="phone">{user.mobile}</span>
//           </p>
//         </div>
//         <span>user's Bio</span>
//       </div>
//       <Card className="Form">
//         <Form size="middle" colon={true} labelAlign="left" layout="vertical">
//           <Form.Item label="Name:">
//             <Input allowClear={true} className="input" value={name} onChange={onNameChange} />
//           </Form.Item>
//           <Form.Item label="User Name:">
//             <Input allowClear={true} className="input" value={userName} onChange={onUserNameChange} />
//           </Form.Item>
//           <Form.Item label="Email:">
//             <Input allowClear={true} className="input" value={email} onChange={onEmailChange} />
//           </Form.Item>
//           <Form.Item label="Mobile:">
//             <Input allowClear={true} className="input" value={mobile} onChange={onMobileChange} />
//           </Form.Item>
//           {role === 'customer' || role === 'admin' ? (
//             <></>
//           ) : (
//             <>
//               <Form.Item label="ID Proof:">
//                 <ImageUploader
//                   withIcon={true}
//                   buttonText="Choose images"
//                   onChange={onFileChange}
//                   imgExtension={['.jpg', '.png']}
//                   maxFileSize={1048576}
//                   singleImage={true}
//                   label="max size 1MB"
//                 />
//               </Form.Item>
//               <Form.Item label="Photo:">
//                 <ImageUploader
//                   withIcon={true}
//                   buttonText="Choose images"
//                   onChange={onFileChange1}
//                   imgExtension={['.jpg', '.png']}
//                   maxFileSize={1048576}
//                   singleImage={true}
//                   label="max size 1MB"
//                 />
//               </Form.Item>
//             </>
//           )}
//           <Button disabled={!active} onClick={onsave} loading={!active}>
//             Save Changes
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Profile;


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
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewBikes = () => {
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
  // console.log(luggageOption)

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
      setLoading(false);
    } catch (error) {
      console.error("Failed to book bike:", error.message);
      setLoading(false);
      setError(true);
    }
  };
  console.log(bike)


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
              <img src={`http://localhost:9000/media/${bike.image}`} alt={bike.name} />
            </div>
              <p>{bike.description}</p>
            <div className="left__info">
              <p className="left__name">{bike.name}</p>
              <p>Price: ₹{bike.price}</p>
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

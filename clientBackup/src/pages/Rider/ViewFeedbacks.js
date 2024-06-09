import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import usersService from '../../services/users';
import './ViewFeedback.css'


const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customer,setCustomer] = useState([]);
  const [rider,setRider] = useState([]);
  const [userData,setUserdata] = useState([])
  const [error, setError] = useState(null);



  const [Allfedback,setAllFeeback] = useState([])
  const [allCustomers,setAllCustomers] = useState([])
  const [allRider,setAllRider] = useState([])
  const user = useSelector((state) => state?.auth?.user);
  let riderId = ''
  let userRole = ''
  if(user && user._id && user.role){
    riderId = user._id
    userRole = user.role
  }
  else{
    riderId = ''
    userRole = ''
  }
  console.log(userRole)
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if(userRole == 'rider'){
          const response = await axios.get(`http://localhost:9000/feedbacks/feedback/${riderId}`);
          setFeedbackList(response.data.feedback);
          setCustomer(response.data.customer)
          setRider(response.data.rider)
          setLoading(false);
        }
        else if(userRole == 'admin'){
          const all = await axios.get(`http://localhost:9000/feedbacks/all`);
          setAllFeeback(all.data.Allfeedback)
          setAllCustomers(all.data.AllCustomer)
          setAllRider(all.data.allRider)
          setLoading(false);
        }
        else{
          console.log('nothing to see here')
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Error fetching feedback');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [riderId]);


  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(allRider)
  console.log(allCustomers)
  console.log(Allfedback)

  const fetchUsers = async () => {
    try {
    const response = await usersService.usersList()
      setUserdata(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      setLoading(false);
    }
  };
  // console.log(userData)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feedback-container">
      <h2>Feedbacks</h2>
      {userRole === 'customer' && <h4 className="customer-name">{user.name}</h4>}
      {userRole === 'rider' ? (
        <ul className="feedback-list">
          {feedbackList.map((feedback) => {
            const associatedCustomer = customer.find(cust => cust._id === feedback.customer);
            return (
              <li key={feedback._id} className="feedback-item">
                <div className="feedback-header">
                  <span className="customer-name">{associatedCustomer && associatedCustomer.name? associatedCustomer.name:''}</span>
                  <span className="customer-contact">
                    <span>{associatedCustomer && associatedCustomer.email? associatedCustomer.email:''}</span>
                    <span>{associatedCustomer && associatedCustomer.mobile? associatedCustomer.mobile:''}</span>
                    <span>Destination : {feedback.destination}</span>
                    <span>Trip Date : {feedback.tripdate.slice(0, 10)}</span>



                  </span>
                </div>
                <div className="feedback-body">
                  <p className="rating">Rating: <strong>{feedback.rating}</strong></p>
                  <p className="comment">Feedback: {feedback.comment}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ):(
        <ul className="feedback-list">
          {Allfedback.map((feedback) => {
            const ALLassociatedRider = allRider.find(rider => rider._id === feedback.rider);
            const AllassociatedCustomer = allCustomers.find(cust => cust._id === feedback.customer)
            return (
              <li key={feedback._id} className="feedback-item">
                <h3>Rider Info</h3>
                <div className="feedback-header">
                  <span className="customer-name">{ALLassociatedRider && ALLassociatedRider.name? ALLassociatedRider.name:''}</span>
                  <span className="customer-contact">
                    <span>{ALLassociatedRider && ALLassociatedRider.email? ALLassociatedRider.email:''}</span>
                    <span>{ALLassociatedRider && ALLassociatedRider.mobile? ALLassociatedRider.mobile:''}</span>
                  </span>
                </div>
                <h3>Customer  Info</h3>
                <div className="feedback-header">
                  <span className="customer-name">{AllassociatedCustomer && AllassociatedCustomer.name? AllassociatedCustomer.name:''}</span>
                  <span className="customer-contact">
                    <span>{AllassociatedCustomer && AllassociatedCustomer.email? AllassociatedCustomer.email:''}</span>
                    <span>{AllassociatedCustomer && AllassociatedCustomer.mobile? AllassociatedCustomer.mobile:''}</span>
                  </span>
                </div>
                <div className="feedback-body">
                  <p className="rating">Rating: <strong>{feedback.rating}</strong></p>
                  <p className="comment">Feedback: {feedback.comment}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {/* {userRole == 'admin' ?(

      ):()} */}
    </div>
  );
};

export default FeedbackList;

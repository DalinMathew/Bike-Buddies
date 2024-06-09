import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = 'http://localhost:9000/'

const getAllBikes = async () =>{
  try {
    const response = await axios.get(`${baseURL}bikes/bikeList`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Failed to fetch user list:', error.message);
    throw error;
  }
}

const getBikeById = async (bikeId) => {
  try {
    const response = await axios.get(`${baseURL}bikes/${bikeId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bike by ID:', error.message);
    throw error;
  }
};

const bookBike = async (bookData) => {
  try {
    const response = await axios.post(`${baseURL}customer/bookings`,bookData);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bike by ID:', error.message);
    throw error;
  }
};


const createFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${baseURL}feedbacks`,feedbackData);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bike by ID:', error.message);
    throw error;
  }
};

const addBike = async (data) => {
  const response = await axios.post(`${baseURL}`, data)
  return response.data
}

const bikesService = {getAllBikes,addBike,getBikeById,bookBike,createFeedback }
export default bikesService
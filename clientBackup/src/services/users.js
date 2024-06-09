import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = 'http://localhost:9000/users'
const registering = async (credentials) =>{
  console.log(credentials);
  const response = await axios.post(`${baseURL}/register` ,credentials ) ;
  console.log(response)
  return response.data 
}

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials)
  return response.data
}


const usersList = async () => {
  try {
    const response = await axios.get(`${baseURL}/userlist`, getAuthHeader());
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Failed to fetch user list:', error.message);
    throw error;
  }
};



const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseURL}/userlist/${userId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user: ' + error.message);
  }}

const logout = async (id) => {
  await axios.post(`${baseURL}/logout`, {id}, getAuthHeader());
}

const update = async (user) => {
  console.log(user)
  const response = await axios.post(
    `${baseURL}/update`,user,
    // {
    //   _id:user?._id,
    //   name: user?.name,
    //   email: user?.email,
    //   mobile: user?.mobile,
    //   age:user?.age,
    //   photo:user?.formData,
    //   username: user?.username, 
    //   photo2: user?.photo2
    // },
    getAuthHeader()
  )
  return response?.data
}

const usersService = { registering, login, logout, update, usersList , deleteUser }
export default usersService
import usersService from '../services/users'
import { SET_USER, CLEAR_USER, UPDATE_USER } from '../actions/auth'
import {BIKE_FETCH_FAILURE,BIKE_FETCH_SUCCESS} from '../actions/bike'
import { notification } from 'antd'

import { message } from 'antd'
// import subscribeUser from './../subscription'

// manpulates the data coming from backend
const adapterFunc = (user) => {
  console.log(user)
  if(user.user == undefined){
    return { ...user, token: user.token }
  }
  return { ...user.user, token: user.token }
}

let user = window.localStorage.getItem('elearning-user')
console.log(user)
const intialState = user
? { user: adapterFunc(JSON.parse(user)), isAuth: true }
: { user: null, isAuth: false }
console.log(intialState)

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: adapterFunc(action.user), isAuth: true }
    case UPDATE_USER:
      return { user: adapterFunc(action.user), isAuth: true }
    case CLEAR_USER:
      return { user: null, isAuth: false }
    default:
      return state
  }
}

export const editProfile = (user) => {
  return async (dispatch) => {
    try {
      const response = await usersService.update(user)
      console.log(response)
      if (response) {
        window.localStorage.setItem('elearning-user', JSON.stringify(response))
        dispatch({ type: UPDATE_USER, user: response })
        notification.success({
          message: 'Saved Successfully'
        })
      } else {
        notification.error({
          message: 'Cant Save'
        })
      }
    } catch (error) {
      notification.error({
        message: 'Cant Save'
      })
      console.log(error)
    }
  }
}

export const register = (credentials) => {
  return async () => {
    try {
      // console.log(credentials)
      const response = await usersService.registering(credentials)
      if (!response) {
        throw new Error('invalid error with response')
      }
    } catch (error) {
      message.error('invalid credentials')
      console.log(error)
    }
  }
}



export const getBikeById = (BikeId) => {
  return async (dispatch) => {
    try {
      const response = await usersService.getBikeById(BikeId); // Assuming getBikeById is a function in your API service
      dispatch({ type: BIKE_FETCH_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: BIKE_FETCH_FAILURE, payload: error.message });
    }
  };
};


/* actions for authentication bellow */

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await usersService.login(credentials)
      window.localStorage.setItem('elearning-user', JSON.stringify(response))
    //   subscribeUser();
      dispatch({ type: SET_USER, user: response })
      console.log('subscribed')
    } catch (error) {
      console.log(error)
      // the backend should send the error message to show
      // message.error(error.response.data.message)
      message.error('invalid credentials')
    }
  }
}

export const logout = (id) => {
// console.log(id)
  return async (dispatch) => {
    try {
      console.log('logout')
      await usersService.logout(id)
      dispatch({ type: CLEAR_USER })
      window.localStorage.removeItem('elearning-user')
    } catch (error) {
      console.log(error)
    }
  }
}

export default authReducer
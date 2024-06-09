import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from './reducers/authReducer'

import axios from 'axios'


const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'auth',
    'assessmentCreation',
    'assessmentTaking',
    'submissions',
    'courseParticipants',
    'summaryGradebook',
    'courseGradebook',
    'modules'
  ]
}

const reducer = combineReducers({
  auth: authReducer,
  
})

const persistedReducer = persistReducer(persistConfig, reducer)

// debugging with devtools
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)
let persistor = persistStore(store)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error?.response?.status === 401) {
      // store.dispatch(logout())
    } else {
      return Promise.reject(error)
    }
  }
)

export { store, persistor }

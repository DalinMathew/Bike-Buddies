import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  matchPath,
  BrowserRouter
} from 'react-router-dom'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import SideNav from '../components/SideNav'
import PublicRoute from '../components/PublicRoute'
import PrivateRoute from '../components/PrivateRoute'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Registeration from '../pages/Registeration'

import Profile from '../views/Profile'

// import Dashboard from '../views/dashboard'


import 'ant-design-pro/dist/ant-design-pro.css'
import S from './style'

import AppHeader from '../components/AppHeader'
import UserList from '../components/usersView'
import RiderList from '../views/ridersList'
import BikeListingPage from '../views/BikeListing/BikeListing'
import Customer from '../pages/Customer/Customer'
import Rider from '../pages/Rider/Rider'
import ViewBikes from '../pages/Customer/ViewBikes'
import LandingPage from '../pages/Landing'
import BookingRequestView from '../pages/Rider/BookingRequestView'
import AddBikeForm from '../pages/Rider/Rider'
import TripManagement from '../pages/Rider/TripManagement'
import FeedbackList from '../pages/Rider/ViewFeedbacks'
import MyBooking from '../pages/Customer/MyBooking'
import Dashboard from '../pages/Dashboard/Dashboard'
import AllBikes from '../pages/AllBikes/AllBikes'

// public routes redirects to /app if authenticated
// private routes redirects to login if not authenticated
const App = () => {
  return (
    // <BrowserRouter>
    // <Switch>
    // <PublicRoute path="/login" component={Login} />
    // <Route path="/Register" component={Registeration} />
    // {/* <Route path="/customer" component = {Customer}></Route> */}
    // <Route path = "/rider" component = {Rider}></Route>
    // {/* <Route path = "/bike/:id" component = {ViewBikes} /> */}
    // {/* <Route path = "/" component = {LandingPage} /> */}
    // <PrivateRoute path="/app" component={AuthnticatedApp} />
    //   {/* future landing page redirect to app for now */}
    //   <Route exact path="/">
    //     <Redirect to="/app"/>
    //   </Route>
    //   <Route path="*" component={NotFoundPage} />
    //   </Switch>

    <Switch>
      <PublicRoute path="/login" component={Login} />
      <Route path="/Register" component={Registeration} />
      <Route path="/rider" component={Rider} />
      <Route path="/app/customer/:id" component={ViewBikes} />
      <PrivateRoute path="/app" component={AuthnticatedApp} />
      <Route exact path="/" component={LandingPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
    // </BrowserRouter>
  )
}

const AuthnticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Content } = Layout

  const location = useLocation()

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  const currentLocationIS = (pathToMatch) => {
    const match = matchPath(location.pathname, pathToMatch)
    if (!match) return false

    return true
  }

  const dispatch = useDispatch()



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav collapsed={collapsed} onCollapse={onCollapse} />

      <Layout
        style={{
          marginLeft: collapsed === true ? 80 : 200,
          transition: 'margin-left .2s'
        }}
      >
        <AppHeader courseNavigation={currentLocationIS('/app/course/:id')} />

        <Content style={{ padding: '20px 32px', height: '100%' }}>
            <Switch>
           

            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/allbikes" component={AllBikes} />

            <Route path="/app/userlist" component={UserList}/>
            <Route path="/app/riderlist" component={RiderList}/>

            <Route path = "/app/rider" component = {BookingRequestView}></Route>
            <Route path = "/app/addbike" component = {AddBikeForm}></Route>
            <Route path = "/app/tripmanage" component = {TripManagement}></Route>
            <Route path = "/app/viewfeedback" component = {FeedbackList}></Route>

            {/* Customer module */}
            <Route path="/app/customer" component={Customer}/>
            <Route path="/app/bookings" component={MyBooking}/>
            <Route path="/app/profile" component={Profile} />
            <Route path = "/app/customer/:id" component = {ViewBikes} />
           
            </Switch>
        </Content>
        <S.Footer>Copyright ©2024 Bike Buddies</S.Footer>
      </Layout>
    </Layout>
  )
}

export default App

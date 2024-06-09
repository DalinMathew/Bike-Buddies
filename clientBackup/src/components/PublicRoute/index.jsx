import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ ...routeProps }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const user = useSelector((state) => state?.auth?.user);
  console.log(user)

  return (
    <>
    {/* {isAuth ? <Redirect to="/app" /> : <Route {...routeProps} />} */}
      {isAuth && user && (
        <>
          {user.role === 'customer' && <Redirect to="/app/customer" />}
          {user.role === 'rider' && <Redirect to="/app/rider" />}
          {user.role === 'admin' && <Redirect to ="/app/dashboard"/> }
        </>
      )}
      {!isAuth && <Route {...routeProps} />}
    </>
  );
}

export default PublicRoute;

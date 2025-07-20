import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/useAuth';
import Loading from '../Shared/Loading/Loading';

const PrivateRoute = ({children}) => {
         const {user,loading}=UseAuth()
         const location= useLocation()
     //     console.log(location);

    if(loading){
      return <Loading></Loading>
         }
         if(!user){
    return <Navigate to={'/login'} state={{ from: location.pathname }}></Navigate>
         }
         else 
    return children
};

export default PrivateRoute;
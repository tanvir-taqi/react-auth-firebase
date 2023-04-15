import React, { useContext } from 'react';
import { AuthContext } from '../UserContext/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <h5 className='fixed top-1/2 left-1/2 animate-bounce'>Loading...</h5>
    }

    if (user){
        return children;
    }
    else{
        return <Navigate to="/join" state={{from: location}} replace></Navigate>;
    }
};

export default PrivateRoute;
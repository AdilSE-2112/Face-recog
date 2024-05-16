import React, { useState, useEffect } from 'react';

import { Navigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';

const PrivateRoute = ({ Component }) => {
 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        if (token) setIsAuthenticated(true);
    }, [])

    return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
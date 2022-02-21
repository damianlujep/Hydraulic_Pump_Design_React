import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation()

    if (!user) {
        return <Navigate to='/' state={{from: location.state}} replace/>;
    }
    return children;
};

export default PrivateRoute;
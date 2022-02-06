import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation()
    const projectInfoData = JSON.parse(sessionStorage.getItem("new-project-info-data"));

    if (!user) {
        return <Navigate to='/' replace state={{from: location.state}} />;
    }
    return children;

    // return user && !projectInfoData ? (<NewProject />) : (<Navigate to='/' replace />)
    // (
        // <Route
        //     {...rest}
        //     render={props => user && projectInfoData ? (
        //         <Component {...props} />
        //     ) : user && !projectInfoData ? (<NewProject {...props} />) : (<Navigate to='/' />)}
        // />
// );


};

export default PrivateRoute;
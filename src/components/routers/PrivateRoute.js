import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import NewProject from "../newproject/NewProject";

const PrivateRoute = ({component: Component, ...rest}) => {
    const { user } = useAuth();
    const projectInfoData = JSON.parse(sessionStorage.getItem("new-project-info-data"));

    return (
        <Route
            {...rest}
            render={props => user && projectInfoData ? (
                <Component {...props} />
            ) : user && !projectInfoData ? (<NewProject {...props} />) : (<Redirect to='/' />)}
        />
    );
};

export default PrivateRoute;
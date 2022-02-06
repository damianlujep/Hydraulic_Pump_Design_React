import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Route } from "react-router-dom";

const PublicRoute = ({component: Component, ...rest}) => {
    const { user } = useAuth();
    const projectInfoData = JSON.parse(sessionStorage.getItem("new-project-info-data"));
    const redirectToWorkspace = () => <Navigate to={`${user.username}/workspace`}/>;
    const redirectToNewProject = () => <Navigate to={`/newProject`}/>;

    return (
        <Route
            {...rest}
            render={props => !user && !projectInfoData ? (
                <Component {...props} />
            ) : user && !projectInfoData ? redirectToNewProject() : redirectToWorkspace()}
        />
    );
};

export default PublicRoute;
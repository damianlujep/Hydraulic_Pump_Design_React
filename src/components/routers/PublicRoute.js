import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({component: Component, ...rest}) => {
    const { user } = useAuth();
    const projectInfoData = JSON.parse(sessionStorage.getItem("new-project-info-data"));
    const redirectToWorkspace = () => <Redirect to={`${user.username}/workspace`}/>;
    const redirectToNewProject = () => <Redirect to={`/newProject`}/>;

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
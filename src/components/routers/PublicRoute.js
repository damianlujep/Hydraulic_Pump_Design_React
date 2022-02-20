import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    const projectInfoData = JSON.parse(sessionStorage.getItem("new-project-info-data"));
    const redirectToWorkspace = () => <Navigate to={`${user.username}/workspace`}/>;
    const redirectToNewProject = () => <Navigate to={`/newProject`}/>;
    const redirectToProjects = () => <Navigate to='/projects' />;

    if (user && !projectInfoData) {
        return redirectToProjects()
    } else {
        if (user && projectInfoData) {
            return redirectToWorkspace()
        }
        return children;
    }
};

export default PublicRoute;
import React from 'react';
import {useSelector} from "react-redux";

import {useAuth} from "../contexts/AuthContext";

import Footer from "../home/Footer";
import NewProjectForm from "./NewProjectForm";
import {styles} from "../styles";

const NewProject = () => {
    const { user } = useAuth();
    const validNewProjectData = useSelector(state => state.projectInfo.newProjectInfoData);
    const newProjectDataEntered = useSelector(state => state.projectInfo.newProjectDataEntered);


    const classes = styles();

    return (
        <>
            <div className={classes.container}>
                <NewProjectForm
                    actionButtonLabel="Create new project"
                    username={user.username}
                    newProjectDataEntered={newProjectDataEntered}
                />
                <Footer/>
            </div>

        </>
    );
};

export default NewProject;
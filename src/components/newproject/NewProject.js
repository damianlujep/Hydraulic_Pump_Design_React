import React, {useState} from 'react';
import {createStyles, CssBaseline, makeStyles} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import Footer from "../Footer";
import NewProjectForm from "./NewProjectForm";

const getSessionStorageOrDefault = (key, defaultValue) => {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

const NewProject = ({authorized, username}) => {
    const [newProjectDataInserted, setNewProjectDataInserted] = useState(getSessionStorageOrDefault('new-project-info-data-entered', false));
    const [validNewProjectData, setValidNewProjectData] = useState(getSessionStorageOrDefault('new-project-info-data', {}));

    if (!authorized) {
        return <Redirect to="/"/>
    }

    const styles = makeStyles((theme) =>
        createStyles({
            container: {
                margin: "0 8px"
            }
        })
    );

    const classes = styles();

    return (
        <>
            <CssBaseline/>
            <div className={classes.container}>
                <NewProjectForm
                    actionButtonLabel="Create new project"
                    username={username}
                    newProjectDataInserted={newProjectDataInserted}
                    setNewProjectDataInserted={setNewProjectDataInserted}
                    setValidNewProjectData={setValidNewProjectData}
                />
                <Footer/>
            </div>
        </>
    );
};

export default NewProject;
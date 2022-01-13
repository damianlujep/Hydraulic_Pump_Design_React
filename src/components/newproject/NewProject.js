import React from 'react';
import {createStyles, CssBaseline, makeStyles} from "@material-ui/core";
import Footer from "../home/Footer";
import NewProjectForm from "./NewProjectForm";
import {useAuth} from "../contexts/AuthContext";
import {useSelector} from "react-redux";


const NewProject = () => {
    const { user } = useAuth();
    const validNewProjectData = useSelector(state => state.projectInfo.newProjectInfoData);
    const newProjectDataEntered = useSelector(state => state.projectInfo.newProjectDataEntered);

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
                    username={user.username}
                    newProjectDataEntered={newProjectDataEntered}
                />
                <Footer/>
            </div>
        </>
    );
};

export default NewProject;
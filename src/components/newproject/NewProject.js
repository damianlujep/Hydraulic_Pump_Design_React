import React from 'react';
import {useSelector} from "react-redux";
import {ThemeProvider} from "@mui/styles";
import theme from "../theme";

import {useAuth} from "../contexts/AuthContext";

import {CssBaseline} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import Footer from "../home/Footer";
import NewProjectForm from "./NewProjectForm";

const NewProject = () => {
    const { user } = useAuth();
    const validNewProjectData = useSelector(state => state.projectInfo.newProjectInfoData);
    const newProjectDataEntered = useSelector(state => state.projectInfo.newProjectDataEntered);

    const styles = makeStyles(() => ({
        container: {
            margin: "0 8px"
        }
    }));

    const classes = styles();

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <div className={classes.container}>
                    <NewProjectForm
                        actionButtonLabel="Create new project"
                        username={user.username}
                        newProjectDataEntered={newProjectDataEntered}
                    />
                    <Footer/>
                </div>
            </ThemeProvider>
        </>
    );
};

export default NewProject;
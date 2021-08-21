import React from 'react';
import {
    Button,
    Container, createStyles, CssBaseline,
    FormGroup,
    InputAdornment,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import Footer from "./Footer";
import {AccountCircle} from "@material-ui/icons";
import LoginForm from "./LoginForm";
import NewProjectForm from "./NewProjectForm";

const NewProject = ({authorized}) => {
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
                <NewProjectForm/>
                <Footer/>
            </div>
        </>
    );
};

export default NewProject;
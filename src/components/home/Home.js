import React from 'react';

import {CssBaseline} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import LoginForm from "./LoginForm";
import Footer from "./Footer";

const Home = () => {
    const styles = makeStyles((theme) => ({
        container: {
            margin: "0 8px"
        }
    }));

    const classes = styles();

    return (
        <>
            <CssBaseline/>
            <div className={classes.container}>
                <LoginForm />
                <Footer/>
            </div>
        </>
    );
};

export default Home;
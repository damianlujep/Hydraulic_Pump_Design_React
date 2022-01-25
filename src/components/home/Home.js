import React from 'react';

import {CssBaseline} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import theme from "../theme";

import LoginForm from "./LoginForm";
import Footer from "./Footer";
import {ThemeProvider} from "@mui/styles";

const Home = () => {
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
                    <LoginForm/>
                    <Footer/>
                </div>
            </ThemeProvider>
        </>
    );
};

export default Home;
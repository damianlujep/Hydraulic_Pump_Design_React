import React, {useState} from 'react';
import Header from "./Header";
import LoginForm from "./LoginForm";
import {Container, createStyles, CssBaseline, makeStyles} from "@material-ui/core";
import Footer from "./Footer";

const Home = ({grandAccess}) => {

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
                <LoginForm addCurrentUser={grandAccess}/>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
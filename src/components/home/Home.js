import React from 'react';
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import {styles} from "../styles";

const Home = () => {

    const classes = styles();

    return (
        <>
                <div className={classes.container}>
                    <LoginForm/>
                    <Footer/>
                </div>
        </>
    );
};

export default Home;
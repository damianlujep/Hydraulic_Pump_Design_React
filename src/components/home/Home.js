import React from 'react';
import LoginForm from "./LoginForm";
import {createStyles, CssBaseline, makeStyles} from "@material-ui/core";
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
                <LoginForm grandAccess={grandAccess}/>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
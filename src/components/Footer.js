import React from 'react';
import {Box, Container, createStyles, makeStyles, Paper, Typography} from "@material-ui/core";

const Footer = () => {
    const styles = makeStyles((theme) =>
        createStyles({
            footerBox: {
                display: "flex",
                alignItems: "center"
            },

            footer: {
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            },
        })
    );

    const classes = styles();

    return (
        <Box bgcolor="primary.main" height="50px">
            <footer className={classes.footer}>
                <Typography variant={"subtitle2"} align="center">Hydraulic Pump Design 2021 ©</Typography>
            </footer>
        </Box>

    );
};

export default Footer;
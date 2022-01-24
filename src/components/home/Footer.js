import React from 'react';

import {Box, Typography} from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const Footer = () => {
    const styles = makeStyles((theme) => ({
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
            backgroundColor: theme.palette.primary.main
        },
    }));

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
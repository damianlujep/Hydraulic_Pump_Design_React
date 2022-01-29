import React from 'react';

import {Container, Paper} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import FullWidthTabs from "./FullWidthTabs";

const WorkspaceMainBox = () => {

    const styles = makeStyles((theme) => ({
        paper: {
            height: "calc(100vh - 120px - 8px)"
        }
    }));

    const classes = styles();

    return (
        <Container maxWidth="xxl">
            <Paper elevation={3} className={classes.paper}>
                <FullWidthTabs />
            </Paper>
        </Container>
    );
};

export default WorkspaceMainBox;
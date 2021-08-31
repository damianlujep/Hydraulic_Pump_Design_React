import React from 'react';
import {Container, createStyles, makeStyles, Paper} from "@material-ui/core";
import FullWidthTabs from "./FullWidthTabs";


const WorkspaceMainBox = () => {

    const styles = makeStyles((theme) =>
        createStyles({
            paper: {
                height: "calc(100vh - 120px - 8px)"
            }
        })
    );

    const classes = styles();

    return (
        <Container maxWidth={"xl"}>
            <Paper elevation={3} className={classes.paper}>
                <FullWidthTabs />
            </Paper>
        </Container>
    );
};

export default WorkspaceMainBox;
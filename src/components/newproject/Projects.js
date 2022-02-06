import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Paper, Typography} from "@mui/material";
import Footer from "../home/Footer";
import {useAuth} from "../contexts/AuthContext";
import makeStyles from "@mui/styles/makeStyles";
import {Create, UploadRounded} from "@mui/icons-material";
import Header from "../home/Header";

const Projects = () => {
    const { user } = useAuth();

    const styles = makeStyles(() => ({
        root: {
            color: 'blue'
        },
        paper: {
            minHeight: "calc(100vh - 114px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: '20px'
        },
    }));

    const classes = styles();

    return (
        <Box>
            <Header />
            <Paper square elevation={3} className={classes.paper}>
                <Container maxWidth={"md"}>
                    <Box>
                        <Typography sx={{mb: "50px"}} variant="h4">Welcome, {user.username}</Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Button sx={{p: "20px", width: "380px", fontSize: "1.5rem"}}
                                    href={`${user.username}/newProject`}
                                    variant='contained'
                                    color="primary"
                                    startIcon={<Create/>}
                            >create new project</Button>
                            <Button sx={{p: "20px", width: "380px", fontSize: "1.5rem"}}
                                    href='/projects'
                                    variant='contained'
                                    color="primary"
                                    startIcon={<UploadRounded/>}
                            >open from existing</Button>
                        </Box>
                    </Box>

                </Container>
            </Paper>
            <Footer />
        </Box>
    );
};

export default Projects;
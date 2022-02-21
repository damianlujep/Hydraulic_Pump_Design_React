import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { projectInfoActions } from "../store/project-info-slice";
import { completionActions } from "../store/completion-slice";

import { URI_LOAD_PROJECT_FROM_FILE } from "../../api-constants";
import { useAuth } from "../contexts/AuthContext";
import { handleAPIResponseError } from "../service/APIRequestsService";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Create } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import Header from "../home/Header";
import FileUploader from "./FileUploader";
import Footer from "../home/Footer";

const Projects = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { user, jwt } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileError, setSelectedFileError] = useState({});
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [validProjectDataJSON, setValidProjectDataJSON] = useState({});

    const selectedFileSuccessHandler = async (file) => {
        setSelectedFile(file);
        setIsFileLoaded(false);
        if (file !== null){
            const authHeader = {'Authorization': jwt};
            let formData = new FormData();
            formData.append("projectFile", file);

            await fetch(URI_LOAD_PROJECT_FROM_FILE, {
                method: 'POST',
                body: formData,
                headers: authHeader,
            })
                .then(handleAPIResponseError)
                .then(res => res.json())
                .then(res => {
                    const formattedData = JSON.stringify(res, (key, value) => (value === null) ? "" : value);
                    setValidProjectDataJSON(JSON.parse(formattedData))
                })
                .then(() => setIsFileLoaded(true))
                .catch(e => {
                    setSelectedFileError({ error: "Incorrect file format, try again" });
                    console.log(e);
                });
        }
    };

    const submitHandler = () => {
        sessionStorage.setItem("new-project-info-data", JSON.stringify(validProjectDataJSON.newProjectInfoData.data));
        sessionStorage.setItem("new-project-info-data-entered", JSON.stringify(validProjectDataJSON.newProjectInfoData.dataEntered));
        sessionStorage.setItem("completion-data", JSON.stringify(validProjectDataJSON.completionData.data));
        sessionStorage.setItem("completion-data-entered", JSON.stringify(validProjectDataJSON.completionData.dataEntered));
        sessionStorage.setItem("survey-data", JSON.stringify(validProjectDataJSON.surveyData.data));
        sessionStorage.setItem("survey-data-entered", JSON.stringify(validProjectDataJSON.surveyData.dataEntered));
        dispatch(projectInfoActions.replaceNewProjectData({
            newProjectInfoData: validProjectDataJSON.newProjectInfoData.data
        }));
        dispatch(completionActions.replaceCompletionData({
            validCompletionData: validProjectDataJSON.completionData.data
        }));
        dispatch(completionActions.replaceSurveyData({
            validSurveyData: validProjectDataJSON.surveyData.data
        }));
        navigate(`/${user.username}/workspace`, { replace: true });
    };

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
                <Container maxWidth="md">
                    <Box>
                        <Typography sx={{ mb: "50px" }} variant="h4">Welcome, { user.name }</Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                sx={{ height: "82px", width: "380px", fontSize: "1.5rem" }}
                                href={`${user.username}/newProject`}
                                variant='contained'
                                color="primary"
                                startIcon={ <Create /> }
                            >
                                create new project
                            </Button>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <FileUploader
                                    onFileSelectSuccess={selectedFileSuccessHandler}
                                    onFileSelectError={setSelectedFileError}
                                />
                                {selectedFile?.name && Object.keys(selectedFileError).length === 0 &&
                                    <>
                                        <Typography
                                            variant="h6"
                                            sx={{py: "15px", width: 380, textAlign: "center"}}
                                        >
                                            <span style={{fontWeight: "bold"}}>{selectedFile.name}</span> {!isFileLoaded ? "is being validated" : "is ready to open"}
                                        </Typography>
                                        <LoadingButton
                                            loading={!isFileLoaded}
                                            loadingIndicator="Loading..."
                                            variant="contained"
                                            color="success"
                                            onClick={submitHandler}
                                        >
                                            Open file
                                        </LoadingButton>
                                    </>
                                }
                                {selectedFileError &&
                                    <Typography
                                    variant="h6"
                                    color="error"
                                    sx={{py: "15px", width: 380, textAlign: "center"}}
                                >
                                    {selectedFileError.error}
                                </Typography>}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Paper>
            <Footer />
        </Box>
    );
};

export default Projects;
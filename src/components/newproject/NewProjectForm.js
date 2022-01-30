import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import {projectInfoActions} from "../store/project-info-slice";

import {
    Button,
    FormGroup,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import {NewProjectInfoData} from "../../models/NewProjectInfoData";
import {ButtonCancel, ButtonMainLarge} from "../partials/Buttons";

const initialDataModel = () => {
    const savedDAta = sessionStorage.getItem("new-project-info-data");

    if (savedDAta !== null){
        return JSON.parse(savedDAta);
    } else {
        const data = new NewProjectInfoData();
        data.wellType = "Directional";
        data.date = (new Date()).toISOString().split('T')[0];
        return data;
    }
}

const NewProjectForm = ({actionButtonLabel, username, newProjectDataEntered}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [newProjectInfoData, setNewProjectInfoData] = useState(initialDataModel);
    const [errors, setErrors] = useState({});

    const renderDynamicLabelButton = () => (newProjectDataEntered) ? "Save changes" : actionButtonLabel;

    const cancelButtonHandler = () => (newProjectDataEntered) ? redirectToWorkspace() : history.push("/");

    const redirectToWorkspace = () => history.push(`/${username}/workspace`);

    const validate = (fieldValues = newProjectInfoData) => {
        let temp = { ...errors }

        if ('newProjectName' in fieldValues)
            temp.newProjectName = fieldValues.newProjectName.length > 0 ? "" : "Required field."

        // if ('newProjectName' in fieldValues)
            // temp.newProjectName = fieldValues.newProjectName.length > 0 ? "" : <p style={{marginBottom: "-19.91px"}}>Required field.</p>

        if ('companyName' in fieldValues)
            temp.companyName = fieldValues.companyName.length > 0 ? "" : "Required field."
        if ('location' in fieldValues)
            temp.location = fieldValues.location.length > 0 ? "" : "Required field."
        if ('sandType' in fieldValues)
            temp.sandType = fieldValues.sandType.length > 0 ? "" : "Required field."
        if ('analystName' in fieldValues)
            temp.analystName = fieldValues.analystName.length > 0 ? "" : "Required field."

        if ('oilField' in fieldValues)
            temp.oilField = fieldValues.oilField.length > 0? "" : "Required field."

        if ('wellName' in fieldValues)
            temp.wellName = fieldValues.wellName.length > 0 ? "" : "Required field."
        if ('date' in fieldValues)
            temp.date = fieldValues.date.length > 0 ? "" : "Required field."
        if ('commentaries' in fieldValues)
            temp.commentaries = fieldValues.commentaries.length > 0 ? "" : "Required field."

        if ('wellType' in fieldValues)
            temp.wellType = fieldValues.wellType.length > 0 ? "" : "Required field."

        setErrors({
            ...temp
        })

        if (fieldValues === newProjectInfoData)
            return Object.values(temp).every(x => x === "")
    }

    const styles = makeStyles(() => ({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        paper: {
            minHeight: "calc(100vh - 50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: 20
        },
        customLabel: {
            display: "flex",
            justifyContent: "center"
        },
        inputGroups: {
            justifyContent: "center",
            paddingBottom: "50px",
            alignItems: "center"
        },
        inputBoxEl: {
            marginBottom: "20px"
        },
        text: {
            marginBottom: "20px"
        },
        selectInput: {
            display: "flex",
            flexDirection: "column"
        },
        buttons: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 15px",
            fontWeight: "bold"
        },
        buttonCreate: {
            padding: "10px",
            width: "250px",
        },
    }));

    const classes = styles();

    const handleNewProjectFormChange = (e) => {
        let value = e.target.value;

        setNewProjectInfoData({
            ...newProjectInfoData,
            [e.target.name]: value
        });
    }

    const submitNewProjectFormHandler = (e) => {
        e.preventDefault();
        const areInputsValid = validate();
        //Save no errors, save data in session and forward to Workspace
        if (areInputsValid){
            sessionStorage.setItem("new-project-info-data", JSON.stringify(newProjectInfoData));
            sessionStorage.setItem("new-project-info-data-entered", JSON.stringify(true));
            dispatch(projectInfoActions.replaceNewProjectData({
                newProjectInfoData
            }));
            redirectToWorkspace();
        }
    }

    return (
        <Paper square elevation={2} className={classes.paper}>
            <form action="#" method="POST" onSubmit={submitNewProjectFormHandler} autoComplete="off">
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center" style={{width: "1200px"}}>
                    <Grid container spacing={0} className={classes.inputGroups}>
                        <Grid item lg={4} sm={2} className={classes.customLabel}>
                            <InputLabel style={{alignSelf:"center"}}>New project name</InputLabel>
                        </Grid>
                        <Grid item lg={8} sm={4}>
                            <TextField
                                style={{width: "80%"}}
                                type="text"
                                id="outlined-basic"
                                variant="outlined"
                                name="newProjectName"
                                value={newProjectInfoData.newProjectName}
                                error={errors.newProjectName}
                                helperText={errors.newProjectName}
                                onChange={handleNewProjectFormChange}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h4" className={classes.text}>User information</Typography>

                    <Grid container spacing={10} className={classes.inputGroups}>
                        <Grid item xs={6} sm={4}>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Company name</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="companyName"
                                    value={newProjectInfoData.companyName}
                                    error={errors.companyName}
                                    helperText={errors.companyName}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Location</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="location"
                                    value={newProjectInfoData.location}
                                    error={errors.location}
                                    helperText={errors.location}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Sand</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="sandType"
                                    value={newProjectInfoData.sandType}
                                    error={errors.sandType}
                                    helperText={errors.sandType}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Analyst name</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="analystName"
                                    value={newProjectInfoData.analystName}
                                    error={errors.analystName}
                                    helperText={errors.analystName}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Oil field</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="oilField"
                                    value={newProjectInfoData.oilField}
                                    error={errors.oilField}
                                    helperText={errors.oilField}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Oil well</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="wellName"
                                    value={newProjectInfoData.wellName}
                                    error={errors.wellName}
                                    helperText={errors.wellName}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Date</InputLabel>
                                <TextField
                                    type="date"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="date"
                                    value={newProjectInfoData.date}
                                    error={errors.date}
                                    helperText={errors.date}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                            <FormGroup className={classes.inputBoxEl}>
                                <InputLabel>Commentaries</InputLabel>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="commentaries"
                                    value={newProjectInfoData.commentaries}
                                    error={errors.commentaries}
                                    helperText={errors.commentaries}
                                    onChange={handleNewProjectFormChange}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className={classes.inputGroups}>
                        <Grid item xs={4} sm={2}>
                            <Typography variant={"h6"}>Production well</Typography>
                        </Grid>

                        <Grid item xs={8} sm={2} className={classes.selectInput}>
                            <InputLabel id="demo-simple-select-helper-label">Oil field type</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="wellType"
                                value={newProjectInfoData.wellType}
                                error={errors.wellType}
                                onChange={handleNewProjectFormChange}
                            >
                                <MenuItem value="Directional">Directional</MenuItem>
                                <MenuItem value="Vertical">Vertical</MenuItem>
                            </Select>

                            {errors.wellType && (
                                <FormHelperText error>
                                    {errors.wellType}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>

                    <section className={classes.buttons}>
                        <Button className={classes.buttonCreate}
                                variant="contained" color="primary"
                                size="large"
                                type="submit"
                        >
                            {
                                renderDynamicLabelButton()
                            }
                        </Button>
                        <ButtonCancel
                            onClick={cancelButtonHandler}
                        />
                    </section>

                </Grid>
            </form>
        </Paper>
    );
};

export default NewProjectForm;
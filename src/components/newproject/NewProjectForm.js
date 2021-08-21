import React from 'react';
import {
    Button,
    Container,
    createStyles,
    FormGroup,
    Grid,
    InputLabel,
    makeStyles, MenuItem,
    Paper, Select,
    TextField,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const NewProjectForm = ({username}) => {
    const [typeOfOilField, setTypeOfOilField] = React.useState("Directional");
    const history = useHistory();

    const handleSelectChange = (event) => {
        setTypeOfOilField(event.target.value);
    };

    const cancelButtonHandler = (event) => {
      history.push("/");
    }

    const createProjectHandler = (event) => {
      history.push(`/${username}/workspace`)
    }

    const styles = makeStyles((theme) =>
        createStyles({
            container: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            paper: {
                height: "calc(100vh - 50px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
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
            buttonCancel: {
                padding: "8px",
                width: "100px",
                marginTop: "20px"
            }
        })
    );

    const classes = styles();

    return (
        <Paper square elevation={2} className={classes.paper}>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center" style={{width: "1200px"}}>
                <Grid container spacing={0} className={classes.inputGroups}>
                    <Grid item lg={4} sm={2} className={classes.customLabel}>
                        <InputLabel style={{alignSelf:"center"}}>New project name</InputLabel>
                    </Grid>
                    <Grid item lg={8} sm={4}>
                        <TextField style={{width: "80%"}} type="text" id="outlined-basic" variant="outlined"/>
                    </Grid>
                </Grid>

                <Typography variant="h4" className={classes.text}>User information</Typography>

                <Grid container spacing={10} className={classes.inputGroups}>
                    <Grid item xs={6} sm={4}>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Company name</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Location</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Sand</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Analyst name</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Oil field</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Oil well</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Date</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
                        </FormGroup>
                        <FormGroup className={classes.inputBoxEl}>
                            <InputLabel>Commentary</InputLabel>
                            <TextField type="text" id="outlined-basic" variant="outlined"/>
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
                            value={typeOfOilField}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="Directional">Directional</MenuItem>
                            <MenuItem value="Vertical">Vertical</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                <section className={classes.buttons}>
                    <Button className={classes.buttonCreate}
                            variant="contained" color="primary"
                            size="large"
                            onClick={createProjectHandler}>
                        Create new project
                    </Button>
                    <Button className={classes.buttonCancel}
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={cancelButtonHandler}>
                        Cancel
                    </Button>
                </section>

            </Grid>
        </Paper>
    );
};

export default NewProjectForm;
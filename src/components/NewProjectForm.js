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

const NewProjectForm = () => {
    const [typeOfOilField, setTypeOfOilField] = React.useState("Directional");

    const handleSelectChange = (event) => {
        setTypeOfOilField(event.target.value);
    };

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
            inputGroups: {
              justifyContent: "center",
                paddingBottom: "50px"
            },
            text: {
              marginBottom: "20px"
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
                marginTop: "40px"
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
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={0} className={classes.inputGroups}>
                    <Grid item xs={6} sm={3}>
                        <InputLabel>New project name</InputLabel>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField>sadsdasdasd</TextField>
                    </Grid>
                </Grid>

                <Typography variant="h4" className={classes.text}>User information</Typography>

                <Grid container spacing={10} className={classes.inputGroups}>
                    <Grid item xs={6} sm={4}>
                        <FormGroup>
                            <InputLabel>Company name</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Location</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Sand</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Analyst name</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <FormGroup>
                            <InputLabel>Oil field</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Oil well</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Date</InputLabel>
                            <TextField type="date"></TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Commentary</InputLabel>
                            <TextField></TextField>
                        </FormGroup>
                    </Grid>
                </Grid>

                <Typography variant={"h6"} className={classes.text}>Production well</Typography>

                <Grid container spacing={0}>
                    <Grid item xs={6} sm={3}>
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
                    <Button className={classes.buttonCreate} variant="contained" color="primary" size="large">
                        Create new project
                    </Button>
                    <Button className={classes.buttonCancel} variant="contained" color="secondary" size="small">
                        Cancel
                    </Button>
                </section>

            </Container>
        </Paper>
    );
};

export default NewProjectForm;
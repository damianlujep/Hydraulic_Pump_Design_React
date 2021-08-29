import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {
    Button,
    createStyles,
    FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    makeStyles,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Typography
} from "@material-ui/core";

const CompletionForm = ({handleClose}) => {
    const history = useHistory();

    const [productionTubingsNumber, setTubingsNumber] = useState(1);
    const [casingPipesNumber, setCasingPipesNumber] = useState(1);

    const [casing, setCasing] = useState(1);
    const [tubing, setTubing] = useState(1);

    const handleTubingNumberChange = (event) => {
        setTubingsNumber(event.target.value);
    };

    const handleCasingNumberChange = (event) => {
        setCasingPipesNumber(event.target.value);
    };

    const handleTubingChange = (event) => {
        setTubing(event.target.value);
    };

    const handleCasingChange = (event) => {
        setCasing(event.target.value);
    };

    const styles = makeStyles((theme) =>
        createStyles({
            root:{
                '& .MuiFormLabel-root':{
                    color: 'rgba(0, 0, 0, 0.74)'
                }
            },
            paper: {
                // minHeight: "calc(100vh - 45px)",
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            },
            customGroup:{
                justifyContent:"center",
                marginBottom: "10px",
                alignItems: "center",
            },
            customLabel: {
                width:"300px",
                textAlign: "right",
                alignSelf:"center",
                marginRight: 40
            },
            customInput:{
                height: "33px",
                width: "130px",
                paddingRight:"0px"
            },
            inputGroups: {
                paddingBottom: "40px",
                alignItems: "center",
                justifyContent: "center"
            },
            inputBoxEl: {
                marginBottom: "20px"
            },
            text: {
                marginBottom: "20px",
                fontWeight: "bold"
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
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.paper}>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center" style={{width: "1200px"}}>

                    <Typography variant="h6" className={classes.text}>Hydraulic pumping completion</Typography>

                    <Grid container direction="column" spacing={0} className={classes.inputGroups} style={{width: '650px'}}>
                        <FormGroup row className={classes.customGroup} >
                            <Grid item xs={8} style={{justifyContent: "center"}}>
                                <InputLabel className={classes.customLabel}>Length at middle depth of shots, MD:</InputLabel>
                            </Grid>

                            <Grid item xs={4}>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    type="number"
                                    className={classes.customInput}
                                />
                            </Grid>
                        </FormGroup>
                        <FormGroup row className={classes.customGroup} >
                            <Grid item xs={8} style={{justifyContent: "center"}}>
                                <InputLabel className={classes.customLabel}>Middle shooting depth, TVD:</InputLabel>
                            </Grid>

                            <Grid item xs={4}>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    type="number"
                                    className={classes.customInput}
                                />
                            </Grid>
                        </FormGroup>
                        <FormGroup row className={classes.customGroup} >
                            <Grid item xs={8} style={{justifyContent: "center"}}>
                                <InputLabel className={classes.customLabel}>Pump settling length, MD:</InputLabel>
                            </Grid>

                            <Grid item xs={4}>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    type="number"
                                    className={classes.customInput}
                                />
                            </Grid>
                        </FormGroup>
                        <FormGroup row className={classes.customGroup} >
                            <Grid item xs={8} style={{justifyContent: "center"}}>
                                <InputLabel className={classes.customLabel}>Pump settling depth, TVD:</InputLabel>
                            </Grid>

                            <Grid item xs={4}>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    type="number"
                                    className={classes.customInput}
                                />
                            </Grid>
                        </FormGroup>
                    </Grid>

                    <Grid container spacing={0} className={classes.inputGroups} style={{width:"650px", paddingBottom:"10px"}}>
                        <Grid xs={6}>
                            <FormGroup row className={classes.customGroup}>
                                <InputLabel id="casing-number-label" style={{marginRight:"20px", fontWeight:"bold"}}>Number of casing pipes:</InputLabel>
                                <Select
                                    variant={"outlined"}
                                    size={"small"}
                                    labelId="casing-number-label"
                                    id="casing-number-select"
                                    value={productionTubingsNumber}
                                    onChange={handleTubingNumberChange}
                                    style={{height:"33px"}}
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>

                        <Grid xs={6}>
                            <FormGroup row className={classes.customGroup} >
                                <InputLabel id="tubing-number-label" style={{marginRight:"20px", fontWeight:"bold"}}>Number of production tubing:</InputLabel>
                                <Select
                                    variant={"outlined"}
                                    labelId="tubing-number-label"
                                    id="tubing-number-select"
                                    value={casingPipesNumber}
                                    onChange={handleCasingNumberChange}
                                    style={{height:"33px"}}
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className={classes.inputGroups} style={{width:"970px", paddingBottom:"20px"}}>
                        <Grid item xs={6}>
                            <FormGroup row className={classes.customGroup}>
                                <InputLabel id="casing-label" style={{marginRight:"20px", fontWeight:"bold"}}>Casing (Size [in] - [lbs / ft))</InputLabel>
                                <Select
                                    variant={"outlined"}
                                    labelId="casing-label"
                                    id="casing-select"
                                    value={casing}
                                    onChange={handleCasingChange}
                                    style={{height:"33px"}}
                                >
                                    <MenuItem value="1">2 3/8' (2.041) - 4.0 UN</MenuItem>
                                    <MenuItem value="2">3 3/8' (2.041) - 4.0 UN</MenuItem>
                                    <MenuItem value="3">4 3/8' (2.041) - 4.0 UN</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={6}>
                            <FormGroup row className={classes.customGroup} >
                                <InputLabel id="tubing-label" style={{marginRight:"20px", fontWeight:"bold"}}> Tubing (Size [in] - [lbs / ft))</InputLabel>
                                <Select
                                    variant={"outlined"}
                                    labelId="tubing-label"
                                    id="tubing-select"
                                    value={tubing}
                                    onChange={handleTubingChange}
                                    style={{height:"33px"}}
                                >
                                    <MenuItem value="1">5 1/2" (4.892) - 17.00</MenuItem>
                                    <MenuItem value="2">6 1/2" (4.892) - 17.00</MenuItem>
                                    <MenuItem value="3">7 1/2" (4.892) - 17.00</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className={classes.inputGroups} style={{width:"970px"}}>
                        <Grid item lg={6}>

                            <Typography variant="subtitle2" className={classes.text} style={{textAlign:"center", marginBottom:"5px"}}>Top</Typography>
                            <div style={{background:"#068BFF29", marginRight: "10px"}}>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Casing length 1:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Outer casing diameter 1:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup}>
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Inner diameter of casing 1:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                            </div>

                            <Typography variant="subtitle2" className={classes.text} style={{textAlign:"center", marginBottom:"5px"}}>Middle</Typography>
                            <div style={{background:"#068BFF29", marginRight: "10px"}}>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Casing length 2:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Outer casing diameter 2:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Inner diameter of casing 2:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                            </div>

                            <Typography variant="subtitle2" className={classes.text} style={{textAlign:"center", marginBottom:"5px"}}>Bottom</Typography>
                            <div style={{background:"#068BFF29", marginRight: "10px"}}>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Casing length 3:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Outer casing diameter 3:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Inner diameter of casing 3:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                            </div>

                        </Grid>

                        <Grid item lg={6}>
                            <Typography variant="subtitle2" className={classes.text} style={{textAlign:"center", marginBottom:"5px"}}>Top</Typography>
                            <div style={{background:"#FFAC0629", marginLeft: "10px"}}>
                                <FormGroup row className={classes.customGroup}  >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Tubing length 1:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Outer tubing diameter 1:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Inner tubing diameter 1:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                            </div>

                            <Typography variant="subtitle2" className={classes.text} style={{textAlign:"center", marginBottom:"5px"}}>Middle</Typography>
                            <div style={{background:"#FFAC0629", marginLeft: "10px"}}>
                                <FormGroup row className={classes.customGroup}  >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Tubing length 2:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Outer tubing diameter 2:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Inner tubing diameter 2:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                            </div>

                            <Typography variant="subtitle2" className={classes.text} style={{textAlign:"center", marginBottom:"5px"}}>Bottom</Typography>
                            <div style={{background:"#FFAC0629", marginLeft: "10px"}}>
                                <FormGroup row className={classes.customGroup}  >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Tubing length 3:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Outer tubing diameter 3:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                                <FormGroup row className={classes.customGroup} >
                                    <InputLabel className={classes.customLabel} style={{marginRight:"0px", paddingRight:"25px"}}>Inner tubing diameter 3:</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        style={{backgroundColor:"white"}}
                                    />
                                </FormGroup>
                            </div>

                        </Grid>
                    </Grid>

                    <section className={classes.buttons}>
                        <Button className={classes.buttonCreate}
                                variant="contained" color="primary"
                                size="large"
                        >
                            Save
                        </Button>
                        <Button className={classes.buttonCancel}
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={handleClose}>
                            Cancel
                        </Button>
                    </section>

                </Grid>
            </Paper>

        </div>
    );
};

export default CompletionForm;
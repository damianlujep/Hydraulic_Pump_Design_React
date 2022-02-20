import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {completionActions} from "../../store/completion-slice";

import {
    Box,
    Button,
    FormGroup,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import {CompletionData} from "../../../models/CompletionData";
import {ButtonCancel} from "../../partials/Buttons";

const initialDataModel = () => {
    const savedDAta = sessionStorage.getItem("completion-data");

    if (savedDAta !== null){
        return JSON.parse(savedDAta);
    } else {
        const data = new CompletionData();
        data.numberProductionTubings = 1;
        data.numberCasingPipes = 1;
        data.casingID = 1;
        data.tubingID = 134;
        return data;
    }
}

const CompletionForm = ({ handleClose, tubingList, casingList }) => {
    const dispatch = useDispatch();
    const [completionData, setCompletionData] = useState(initialDataModel);
    const [errors, setErrors] = useState({});

    const styles = makeStyles(() =>({
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
            paddingRight:"8px"
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
    }));

    const handleCompletionFormChange = (e) => {
        let value = e.target.value;

        if (!isNaN(value) && value !== ""){
            value = parseFloat(value)
        }

        setCompletionData({
            ...completionData,
            [e.target.name]: value
        });
    }

    const submitCompletionFormHandler = (e) => {
        e.preventDefault();
        const areInputValid = validate();

        //Save no errors, save data in session and close form
        if (areInputValid){
            sessionStorage.setItem("completion-data", JSON.stringify(completionData));
            sessionStorage.setItem("completion-data-entered", JSON.stringify(true));
            dispatch(completionActions.replaceCompletionData({
                validCompletionData: completionData
            }));
            handleClose();
        }
    };

    const classes = styles();
    const maxDecimals = "0.001";

    const [casingTMBDisplay, setCasingTMBDisplay] = useState({middle:{display:"none"}, bottom:{display:"none"}});
    const [tubingTMBDisplay, setTubingTMBDisplay] = useState({middle:{display:"none"}, bottom:{display:"none"}});

    //Dynamic casing # render
    useEffect(() => {
        const numberCasingPipes = completionData.numberCasingPipes;

        if (numberCasingPipes === 2){
            setCasingTMBDisplay({
                middle:{display:"block"}, bottom:{display:"none"}
            });
        } else if (numberCasingPipes === 3){
            setCasingTMBDisplay({
                middle:{display:"block"}, bottom:{display:"block"}
            });
        } else {
            setCasingTMBDisplay({
                middle:{display:"none"}, bottom:{display:"none"}
            });
        }
    }, [completionData.numberCasingPipes]);

    //Dynamic tubing # render
    useEffect(() => {
        const numberProductionTubings = completionData.numberProductionTubings;

        if (numberProductionTubings === 2){
            setTubingTMBDisplay({
                middle:{display:"block"}, bottom:{display:"none"}
            });
        } else if (numberProductionTubings === 3){
            setTubingTMBDisplay({
                middle:{display:"block"}, bottom:{display:"block"}
            });
        } else {
            setTubingTMBDisplay({
                middle:{display:"none"}, bottom:{display:"none"}
            });
        }
    }, [completionData.numberProductionTubings]);

    //Validation for form onSubmit(). Returns true if 0 errors
    const validate = (fieldValues = completionData) => {
        let temp = { ...errors }

        if ('lengthOfShots' in fieldValues)
            temp.lengthOfShots = fieldValues.lengthOfShots > 0 ? "" : "Required field."
        if ('averageShotDepth' in fieldValues)
            temp.averageShotDepth = fieldValues.averageShotDepth > 0 ? "" : "Required field."
        if ('pumpSettlementLength' in fieldValues)
            temp.pumpSettlementLength = fieldValues.pumpSettlementLength > 0 ? "" : "Required field."
        if ('pumpSettlementDepth' in fieldValues)
            temp.pumpSettlementDepth = fieldValues.pumpSettlementDepth > 0 ? "" : "Required field."

        if ('numberCasingPipes' in fieldValues)
            temp.numberCasingPipes = fieldValues.numberCasingPipes >= 1 ? "" : "Required field."
        if ('numberProductionTubings' in fieldValues)
            temp.numberProductionTubings = fieldValues.numberProductionTubings >= 0 ? "" : "Required field."

        if ('casingID' in fieldValues)
            temp.casingID = fieldValues.casingID > 0 ? "" : "Required field."
        if ('tubingID' in fieldValues)
            temp.tubingID = fieldValues.tubingID > 0 ? "" : "Required field."

        if ('casingLength1' in fieldValues)
            temp.casingLength1 = fieldValues.casingLength1 > 0 ? "" : "Required field."
        if ('ODCasing1' in fieldValues)
            temp.ODCasing1 = fieldValues.ODCasing1 > 0 ? "" : "Required field."
        if ('IDCasing1' in fieldValues)
            temp.IDCasing1 = fieldValues.IDCasing1 > 0 ? "" : "Required field."


        if (fieldValues.numberCasingPipes === 2 || fieldValues.numberCasingPipes === 3){
            if ('casingLength2' in fieldValues)
                temp.casingLength2 = fieldValues.casingLength2 > 0 ? "" : "Required field."
            if ('ODCasing2' in fieldValues)
                temp.ODCasing2 = fieldValues.ODCasing2 > 0 ? "" : "Required field."
            if ('IDCasing2' in fieldValues)
                temp.IDCasing2 = fieldValues.IDCasing2 > 0 ? "" : "Required field."
        } else {
            temp.casingLength2 = "";
            temp.ODCasing2 = "";
            temp.IDCasing2 = "";
        }

        if (fieldValues.numberCasingPipes === 3){
            if ('casingLength3' in fieldValues)
                temp.casingLength3 = fieldValues.casingLength3 > 0 ? "" : "Required field."
            if ('ODCasing3' in fieldValues)
                temp.ODCasing3 = fieldValues.ODCasing3 > 0 ? "" : "Required field."
            if ('IDCasing3' in fieldValues)
                temp.IDCasing3 = fieldValues.IDCasing3 > 0 ? "" : "Required field."
        } else {
            temp.casingLength3 = "";
            temp.ODCasing3 = "";
            temp.IDCasing3 = "";
        }

        if ('tubingLength1' in fieldValues)
            temp.tubingLength1 = fieldValues.tubingLength1 > 0 ? "" : "Required field."
        if ('ODTubing1' in fieldValues)
            temp.ODTubing1 = fieldValues.ODTubing1 > 0 ? "" : "Required field."
        if ('IDTubing1' in fieldValues)
            temp.IDTubing1 = fieldValues.IDTubing1 > 0 ? "" : "Required field."

        if (fieldValues.numberProductionTubings === 2 || fieldValues.numberProductionTubings === 3){
            if ('tubingLength2' in fieldValues)
                temp.tubingLength2 = fieldValues.tubingLength2 > 0 ? "" : "Required field."
            if ('ODTubing2' in fieldValues)
                temp.ODTubing2 = fieldValues.ODTubing2 > 0 ? "" : "Required field."
            if ('IDTubing2' in fieldValues)
                temp.IDTubing2 = fieldValues.IDTubing2 > 0 ? "" : "Required field."
        } else {
            temp.tubingLength2 = "";
            temp.ODTubing2 = "";
            temp.IDTubing2 = "";
        }

        if (fieldValues.numberProductionTubings === 3){
            if ('tubingLength3' in fieldValues)
                temp.tubingLength3 = fieldValues.tubingLength3 > 0 ? "" : "Required field."
            if ('ODTubing3' in fieldValues)
                temp.ODTubing3 = fieldValues.ODTubing3 > 0 ? "" : "Required field."
            if ('IDTubing1' in fieldValues)
                temp.IDTubing3 = fieldValues.IDTubing3 > 0 ? "" : "Required field."
        } else {
            temp.tubingLength3 = "";
            temp.ODTubing3 = "";
            temp.IDTubing3 = "";
        }

        setErrors({
            ...temp
        })

        if (fieldValues === completionData)
            return Object.values(temp).every(x => x === "")
    };

    return (

        <Box className={classes.root}>
            <Paper square elevation={0} className={classes.paper}>

                <form action="#" method="POST" onSubmit={submitCompletionFormHandler} autoComplete="off">

                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center" style={{width: "1200px"}}>

                        <Typography variant="h6" className={classes.text}>Hydraulic pumping completion</Typography>

                        <Grid container direction="column" spacing={0} className={classes.inputGroups}
                              style={{width: '650px'}}>
                            <FormGroup row className={classes.customGroup}>
                                <Grid item xs={8} style={{justifyContent: "center"}}>
                                    <InputLabel className={classes.customLabel}>Length at middle depth of shots,
                                        MD:</InputLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <OutlinedInput
                                        id="lengthOfShots"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        inputProps={{step: maxDecimals, min: "0"}}
                                        onChange={handleCompletionFormChange}
                                        name="lengthOfShots"
                                        value={completionData.lengthOfShots}
                                        error={errors.lengthOfShots}
                                    />

                                    {errors.lengthOfShots && (
                                        <FormHelperText error>
                                            {errors.lengthOfShots}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </FormGroup>
                            <FormGroup row className={classes.customGroup}>
                                <Grid item xs={8} style={{justifyContent: "center"}}>
                                    <InputLabel className={classes.customLabel}>Middle shooting depth, TVD:</InputLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <OutlinedInput
                                        id="averageShotDepth"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        className={classes.customInput}
                                        inputProps={{step: maxDecimals}}
                                        onChange={handleCompletionFormChange}
                                        name="averageShotDepth"
                                        value={completionData.averageShotDepth}
                                        error={errors.averageShotDepth}
                                    />

                                    {errors.averageShotDepth && (
                                        <FormHelperText error>
                                            {errors.averageShotDepth}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </FormGroup>
                            <FormGroup row className={classes.customGroup}>
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
                                        inputProps={{step: maxDecimals}}
                                        onChange={handleCompletionFormChange}
                                        name="pumpSettlementLength"
                                        value={completionData.pumpSettlementLength}
                                        error={errors.pumpSettlementLength}
                                    />

                                    {errors.pumpSettlementLength && (
                                        <FormHelperText error>
                                            {errors.pumpSettlementLength}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </FormGroup>
                            <FormGroup row className={classes.customGroup}>
                                <Grid item xs={8} style={{justifyContent: "center"}}>
                                    <InputLabel className={classes.customLabel}>Pump settling depth, TVD:</InputLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        type="number"
                                        inputProps={{step: maxDecimals}}
                                        onChange={handleCompletionFormChange}
                                        className={classes.customInput}
                                        name="pumpSettlementDepth"
                                        value={completionData.pumpSettlementDepth}
                                        error={errors.pumpSettlementDepth}
                                    />

                                    {errors.pumpSettlementDepth && (
                                        <FormHelperText error>
                                            {errors.pumpSettlementDepth}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </FormGroup>
                        </Grid>

                        <Grid container spacing={0} className={classes.inputGroups}
                              style={{width: "650px", paddingBottom: "10px"}}>
                            <Grid xs={6}>
                                <FormGroup row className={classes.customGroup}>
                                    <InputLabel id="casing-number-label"
                                                style={{marginRight: "20px", fontWeight: "bold"}}>Number of casing
                                        pipes:</InputLabel>
                                    <Select
                                        variant={"outlined"}
                                        size={"small"}
                                        labelId="casing-number-label"
                                        id="casing-number-select"
                                        onChange={handleCompletionFormChange}
                                        style={{height: "33px"}}
                                        name="numberCasingPipes"
                                        value={completionData.numberCasingPipes}
                                        error={errors.numberCasingPipes}
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                    </Select>

                                    {errors.numberCasingPipes && (
                                        <FormHelperText error>
                                            {errors.numberCasingPipes}
                                        </FormHelperText>
                                    )}
                                </FormGroup>
                            </Grid>

                            <Grid xs={6}>
                                <FormGroup row className={classes.customGroup}>
                                    <InputLabel id="tubing-number-label"
                                                style={{marginRight: "20px", fontWeight: "bold"}}>Number of production
                                        tubing:</InputLabel>
                                    <Select
                                        variant={"outlined"}
                                        labelId="tubing-number-label"
                                        id="tubing-number-select"
                                        onChange={handleCompletionFormChange}
                                        style={{height: "33px"}}
                                        name="numberProductionTubings"
                                        value={completionData.numberProductionTubings}
                                        error={errors.numberProductionTubings}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </Select>

                                    {errors.numberProductionTubings && (
                                        <FormHelperText error>
                                            {errors.numberProductionTubings}
                                        </FormHelperText>
                                    )}
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} className={classes.inputGroups}
                              style={{width: "970px", paddingBottom: "20px"}}>
                            <Grid item xs={6}>
                                <FormGroup row className={classes.customGroup}>
                                    <InputLabel id="casing-label" style={{marginRight: "20px", fontWeight: "bold"}}>Casing
                                        (Size [in] - [lbs / ft))</InputLabel>
                                    <Select
                                        variant={"outlined"}
                                        labelId="casing-label"
                                        id="casing-select"
                                        onChange={handleCompletionFormChange}
                                        style={{height: "33px"}}
                                        name="casingID"
                                        value={completionData.casingID}
                                        error={errors.casingID}
                                    >
                                        {
                                            casingList.map((el, index)=> {
                                                return <MenuItem value={el.id} key={index}>{`${el.outerDiameter} (${el.innerDiameter}) - ${el.nominalWeight}`}</MenuItem>
                                            })
                                        }

                                    </Select>

                                    {errors.casingID && (
                                        <FormHelperText error>
                                            {errors.casingID}
                                        </FormHelperText>
                                    )}
                                </FormGroup>
                            </Grid>

                            <Grid item xs={6}>
                                <FormGroup row className={classes.customGroup}>
                                    <InputLabel id="tubing-label"
                                                style={{marginRight: "20px", fontWeight: "bold"}}> Tubing (Size [in] -
                                        [lbs / ft))</InputLabel>
                                    <Select
                                        variant={"outlined"}
                                        labelId="tubing-label"
                                        id="tubing-select"
                                        onChange={handleCompletionFormChange}
                                        style={{height: "33px"}}
                                        name="tubingID"
                                        value={completionData.tubingID}
                                        error={errors.tubingID}
                                    >
                                        {
                                            tubingList.map((el, index)=> {
                                                return <MenuItem value={el.id} key={index}>{`${el.outerDiameter} (${el.innerDiameter}) - ${el.nominalWeight}`}</MenuItem>
                                            })
                                        }


                                    </Select>

                                    {errors.tubingID && (
                                        <FormHelperText error>
                                            {errors.tubingID}
                                        </FormHelperText>
                                    )}
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} className={classes.inputGroups} style={{width: "970px"}}>
                            <Grid item lg={6}>
                                {/*Casing Top*/}
                                <section>
                                    <Typography variant="subtitle2" className={classes.text}
                                                style={{textAlign: "center", marginBottom: "5px"}}>Top</Typography>
                                    <div style={{background: "#068BFF29", marginRight: "10px"}}>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Casing length
                                                1:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="casingLength1"
                                                value={completionData.casingLength1}
                                                error={errors.casingLength1}
                                            />

                                            {errors.casingLength1 && (
                                                <FormHelperText error>
                                                    {errors.casingLength1}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Outer casing
                                                diameter 1:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="ODCasing1"
                                                value={completionData.ODCasing1}
                                                error={errors.ODCasing1}
                                            />

                                            {errors.ODCasing1 && (
                                                <FormHelperText error>
                                                    {errors.ODCasing1}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Inner diameter of
                                                casing 1:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="IDCasing1"
                                                value={completionData.IDCasing1}
                                                error={errors.IDCasing1}
                                            />
                                            {errors.IDCasing1 && (
                                                <FormHelperText error>
                                                    {errors.IDCasing1}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                    </div>
                                </section>

                                {/*Casing Middle*/}
                                <section style={casingTMBDisplay.middle}>
                                    <Typography variant="subtitle2" className={classes.text}
                                                style={{textAlign: "center", marginBottom: "5px"}}>Middle</Typography>
                                    <div style={{background: "#068BFF29", marginRight: "10px"}}>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Casing length
                                                2:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="casingLength2"
                                                value={completionData.casingLength2}
                                                error={errors.casingLength2}
                                            />

                                            {errors.casingLength2 && (
                                                <FormHelperText error>
                                                    {errors.casingLength2}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Outer casing
                                                diameter 2:</InputLabel>
                                            <OutlinedInput
                                                id="ODCasing2"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="ODCasing2"
                                                value={completionData.ODCasing2}
                                                error={errors.ODCasing2}
                                            />

                                            {errors.ODCasing2 && (
                                                <FormHelperText error>
                                                    {errors.ODCasing2}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Inner diameter of
                                                casing 2:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="IDCasing2"
                                                value={completionData.IDCasing2}
                                                error={errors.IDCasing2}
                                            />

                                            {errors.IDCasing2 && (
                                                <FormHelperText error>
                                                    {errors.IDCasing2}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                    </div>
                                </section>

                                {/*Casing Bottom*/}
                                <section style={casingTMBDisplay.bottom}>
                                    <Typography variant="subtitle2" className={classes.text}
                                                style={{textAlign: "center", marginBottom: "5px"}}>Bottom</Typography>
                                    <div style={{background: "#068BFF29", marginRight: "10px"}}>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Casing length
                                                3:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="casingLength3"
                                                value={completionData.casingLength3}
                                                error={errors.casingLength3}
                                            />

                                            {errors.casingLength3 && (
                                                <FormHelperText error>
                                                    {errors.casingLength3}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Outer casing
                                                diameter 3:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="ODCasing3"
                                                value={completionData.ODCasing3}
                                                error={errors.ODCasing3}
                                            />

                                            {errors.ODCasing3 && (
                                                <FormHelperText error>
                                                    {errors.ODCasing3}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Inner diameter of
                                                casing 3:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="IDCasing3"
                                                value={completionData.IDCasing3}
                                                error={errors.IDCasing3}
                                            />

                                            {errors.IDCasing3 && (
                                                <FormHelperText error>
                                                    {errors.IDCasing3}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                    </div>
                                </section>

                            </Grid>

                            <Grid item lg={6}>
                                {/*Tubing Bottom*/}
                                <section>
                                    <Typography variant="subtitle2" className={classes.text}
                                                style={{textAlign: "center", marginBottom: "5px"}}>Top</Typography>
                                    <div style={{background: "#FFAC0629", marginLeft: "10px"}}>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Tubing length
                                                1:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="tubingLength1"
                                                value={completionData.tubingLength1}
                                                error={errors.tubingLength1}
                                            />

                                            {errors.tubingLength1 && (
                                                <FormHelperText error>
                                                    {errors.tubingLength1}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Outer tubing
                                                diameter 1:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="ODTubing1"
                                                value={completionData.ODTubing1}
                                                error={errors.ODTubing1}
                                            />

                                            {errors.ODTubing1 && (
                                                <FormHelperText error>
                                                    {errors.ODTubing1}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Inner tubing
                                                diameter 1:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="IDTubing1"
                                                value={completionData.IDTubing1}
                                                error={errors.IDTubing1}
                                            />

                                            {errors.IDTubing1 && (
                                                <FormHelperText error>
                                                    {errors.IDTubing1}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                    </div>
                                </section>

                                {/*Tubing Middle*/}
                                <section style={tubingTMBDisplay.middle}>
                                    <Typography variant="subtitle2" className={classes.text}
                                                style={{textAlign: "center", marginBottom: "5px"}}>Middle</Typography>
                                    <div style={{background: "#FFAC0629", marginLeft: "10px"}}>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Tubing length
                                                2:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="tubingLength2"
                                                value={completionData.tubingLength2}
                                                error={errors.tubingLength2}
                                            />

                                            {errors.tubingLength2 && (
                                                <FormHelperText error>
                                                    {errors.tubingLength2}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Outer tubing
                                                diameter 2:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="ODTubing2"
                                                value={completionData.ODTubing2}
                                                error={errors.ODTubing2}
                                            />

                                            {errors.ODTubing2 && (
                                                <FormHelperText error>
                                                    {errors.ODTubing2}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Inner tubing
                                                diameter 2:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="IDTubing2"
                                                value={completionData.IDTubing2}
                                                error={errors.IDTubing2}
                                            />

                                            {errors.IDTubing2 && (
                                                <FormHelperText error>
                                                    {errors.IDTubing2}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                    </div>
                                </section>

                                {/*Tubing Bottom*/}
                                <section style={tubingTMBDisplay.bottom}>
                                    <Typography variant="subtitle2" className={classes.text}
                                                style={{textAlign: "center", marginBottom: "5px"}}>Bottom</Typography>
                                    <div style={{background: "#FFAC0629", marginLeft: "10px"}}>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Tubing length
                                                3:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">ft</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="tubingLength3"
                                                value={completionData.tubingLength3}
                                                error={errors.tubingLength3}
                                            />

                                            {errors.tubingLength3 && (
                                                <FormHelperText error>
                                                    {errors.tubingLength3}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Outer tubing
                                                diameter 3:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="ODTubing3"
                                                value={completionData.ODTubing3}
                                                error={errors.ODTubing3}
                                            />

                                            {errors.ODTubing3 && (
                                                <FormHelperText error>
                                                    {errors.ODTubing3}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                        <FormGroup row className={classes.customGroup}>
                                            <InputLabel className={classes.customLabel}
                                                        style={{marginRight: "0px", paddingRight: "25px"}}>Inner tubing
                                                diameter 3:</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="start">in</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                type="number"
                                                className={classes.customInput}
                                                inputProps={{step: maxDecimals}}
                                                onChange={handleCompletionFormChange}
                                                style={{backgroundColor: "white"}}
                                                name="IDTubing3"
                                                value={completionData.IDTubing3}
                                                error={errors.IDTubing3}
                                            />

                                            {errors.IDTubing3 && (
                                                <FormHelperText error>
                                                    {errors.IDTubing3}
                                                </FormHelperText>
                                            )}
                                        </FormGroup>
                                    </div>
                                </section>

                            </Grid>
                        </Grid>

                        <section className={classes.buttons}>
                            <Button className={classes.buttonCreate}
                                    variant="contained" color="primary"
                                    size="large"
                                    type="submit"
                            >
                                Save
                            </Button>
                            <ButtonCancel
                                    onClick={handleClose}>
                            </ButtonCancel>
                        </section>
                    </Grid>

                </form>

            </Paper>
        </Box>
    );
};

export default CompletionForm;
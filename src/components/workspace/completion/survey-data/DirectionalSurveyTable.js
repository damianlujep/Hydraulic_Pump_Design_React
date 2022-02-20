import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { completionActions } from "../../../store/completion-slice";

import {Alert, Box, Button, Grid, Paper, Typography} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';

import SurveyService from "../../../service/SurveyService";

const DirectionalSurveyTable = ({ handleClose }) => {
    const dispatch = useDispatch();
    const [surveyTableData, setSurveyTableData] = useState([]);
    const surveyInitialData = useSelector(
        state => state.completion.validSurveyData
    );

    useEffect(() => {
        setSurveyTableData(surveyInitialData);
    }, [surveyInitialData]);

    const columns = [
        { field: 'id', headerName: 'id', flex: 1/10, editable: false, sortable: false, type: 'number'},
        { field: 'md', headerName: 'MD [feet]', description:"Middle Depth in ft", flex:2.2/10, editable: true, sortable: false, type: "number",
            renderCell: (params) => validateNumbersColumnRendering(params)
        },
        { field: 'tvd', headerName: 'TVD [feet]', description:"Middle Depth in ft", flex:2.2/10, editable: true, sortable: false, type: "number",
            renderCell: (params) => validateNumbersColumnRendering(params)
        },
        { field: 'hd', headerName: 'HD [feet]', description:"Horizontal Depth", flex:2.2/10, editable: false, sortable: false , type: 'number',
            valueFormatter: (params) => (params.value === "") ? "" : parseFloat(params.value).toFixed(3),
            valueGetter: (params) => {
                if (params.id === 1)
                    return params.value;
                if (params.id > 1 &&
                    params.row.tvd &&
                    parseFloat(params.row.tvd) > 0 &&
                    params.row.md &&
                    parseFloat(params.row.md) > 0)
                {
                    const currentMD = parseFloat(params.row.md);
                    const currentTVD = parseFloat(params.row.tvd);
                    const previousMD = parseFloat(params.getValue(params.id - 1, "md"));
                    const previousTVD = parseFloat(params.getValue(params.id - 1, "tvd"));
                    const previousHD = parseFloat(params.getValue(params.id - 1, "hd"));

                    if (Math.round(currentMD - currentTVD) > 0) {
                        return SurveyService.calculateHorizontalDistance(
                            currentMD, currentTVD, previousMD, previousTVD, previousHD
                        );
                    } else {
                        return 0;
                    }
                } else {
                    return "";
                }
            }
        },
        { field: 'angle', headerName: 'Angle [degrees]', flex:2.4/10, editable: false, sortable: false, type: 'number',
            valueFormatter: (params) => (params.value === "") ? "" : Math.round(parseFloat(params.value)),
            valueGetter: (params) => {
                if (params.id === 1)
                    return params.value;
                if (params.id > 1 &&
                    params.row.tvd &&
                    parseFloat(params.row.tvd) > 0 &&
                    params.row.md  &&
                    parseFloat(params.row.md) > 0)
                {
                    const currentMD = parseFloat(params.row.md);
                    const currentTVD = parseFloat(params.row.tvd);
                    const previousMD = parseFloat(params.getValue(params.id - 1, "md"));
                    const previousTVD = parseFloat(params.getValue(params.id - 1, "tvd"));

                    if (Math.round(currentMD - currentTVD) > 0) {
                        return SurveyService.calculateAngle(currentMD, currentTVD, previousMD, previousTVD);
                    } else {
                        return 0;
                    }
                } else {
                    return "";
                }
            }
       }
    ];

    const validateNumbersColumnRendering = (numberStr) => {
        const numberValue = parseFloat(numberStr.value);
        if (!isNaN(numberValue)){
            if (numberValue >= 0){
                return (
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid",
                        backgroundColor: 'rgb(212, 237, 218)',
                        borderColor: '#c3e6cb',
                        textAlign: "right"
                    }}>
                        {(numberValue.toFixed(3))}
                    </Box>
                )
            } else {
                return (
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        color: '#721c24',
                        border: "1px solid",
                        backgroundColor: '#f8d7da',
                        borderColor: '#f5c6cb',
                        textAlign: 'right'
                    }}>
                        {(numberValue.toFixed(3))}
                    </Box>
                )
            }
        } else {
            return (
                <Box sx={{width: "100%", height: "100%",
                    border: "1px solid",
                    backgroundColor: '#ffffff',
                    borderColor: 'rgba(224, 224, 224, 1)'}}>
                </Box>
            )
        }
    };

    const styles = makeStyles(() => ({
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
        },
    }));

    const tableStyles = makeStyles((theme) => ({
        root: {
            '& .MuiDataGrid-cell--editing': {
                backgroundColor: 'rgb(255,215,115, 0.19)',
                color: '#1a3e72',
            },
            '& .Mui-error': {
                backgroundColor: `rgb(126,10,15, 0.1)`,
                color: '#750f0f',
            },
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme.palette.primary.main,
                justifyContent: "center",
                color: "white"
            },
            '& .MuiDataGrid-cell--editable': {
                // backgroundColor: 'rgb(217 243 190)',
                border: "1px solid white"
            },
            '&. MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.primary.main
            },
            '& .MuiDataGrid-columnHeader': {
                backgroundColor: theme.palette.primary.main,
                color: "white"
            }
        }
    }));

    const onRowEditCommit = (params) =>{
        setSurveyTableData(prevState => {
            const oldState = [...prevState];
            //Search edited row id in prevState
            let editedRow = oldState.find(row => row.id === params.id);
            //Replace old value for new value in edited row
            editedRow = {...editedRow, [params.field]: params.value};
            //Replace old row for new row in array
            return oldState.map(row => row.id !== editedRow.id ? row : editedRow);
        });
    };

    const [errorsList, setErrorsList] = useState([]);

    //Validation for final surveyData. Returns true if 0 errors
    const validateDataSurvey = (fieldValues = surveyTableData) => {
        const mdSumary = Object.values(fieldValues).map((el) => el.md);
        const tvdSumary = Object.values(fieldValues).map((el) => el.tvd);
        const errors = [];

        for (let index = 0; index <= 2; index++) {
            if (mdSumary[index] === "" || mdSumary[index] < 0 ||
                tvdSumary[index] === "" || tvdSumary[index] < 0) {
                errors.push("First 3 rows are required");
                break;
            }
        }

        for (let index = 1; index <= 20; index++) {
            if (mdSumary[index] < 0 || tvdSumary[index] < 0) {
                errors.push("Values must be > 0, check values in red");
                break;
            }
        }
        return errors;
    };

    const verifySurveyData = (e) => {
        e.preventDefault();
        const errorsList = validateDataSurvey();

        let areNumbersFormatErrors = false;
        if (errorsList.length === 0) {
            let oldState = [...surveyTableData];
            let previousRow = oldState[0];
            const cleanedData = oldState.map(el => {
                if (el.id > 1 && el.md && el.tvd) {
                    let currentHD = 0;
                    let currentAngle = 0;
                    if (Math.round(el.md - el.tvd) > 0) {
                        currentHD = SurveyService.calculateHorizontalDistance(
                            el.md, el.tvd, previousRow.md, previousRow.tvd, previousRow.hd
                        );
                        currentAngle = SurveyService.calculateAngle(el.md, el.tvd, previousRow.md, previousRow.tvd);
                    }
                    isNaN(currentHD) ? areNumbersFormatErrors = true : el = {
                        ...el,  hd: parseFloat(currentHD.toFixed(3))
                    };
                    isNaN(currentAngle) ? areNumbersFormatErrors = true : el = {
                        ...el,  angle: parseFloat(currentAngle.toFixed(3))
                    };
                }
                if ( (el.id > 1 && el.md && !el.tvd) ||
                     (el.id > 1 && el.tvd && !el.md) ||
                     (el.id > 1 && !el.tvd && !el.md)
                ) {
                    el = {...el, tvd: "", md: "", hd: "", angle: "" }
                }
                previousRow = el;
                return el;
            });

            if (!areNumbersFormatErrors) {
                sessionStorage.setItem("survey-data-entered", JSON.stringify(true));
                dispatch(completionActions.replaceSurveyData({
                    validSurveyData: cleanedData
                }));
                sessionStorage.setItem("survey-data", JSON.stringify(cleanedData));
                handleClose();
            } else {
                setErrorsList(["Error on survey data, please correct"])
            }
        } else {
            setErrorsList(errorsList);
        }
    };

    const classes = styles();
    const tableClasses = tableStyles();
    const maxDecimals = "0.001";

    return (
        <Box className={classes.root}>
            <Paper square elevation={0} className={classes.paper}>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center" style={{width: "1200px"}}>
                    <Typography variant="h6" className={classes.text}>Insert Direction Survey Data</Typography>
                    <Box style={{width: '600px', paddingTop: "10px", marginBottom:"20px", }}>
                        <DataGrid
                            inputProps={{step: maxDecimals, min: "0"}}
                            isCellEditable={(params => params.id !== 1)}
                            className={tableClasses.root}
                            rows={surveyTableData}
                            columns={columns}
                            hideFooter={true}
                            disableExtendRowFullWidth={true}
                            rowHeight={30}
                            disableColumnFilter={true}
                            disableColumnMenu={true}
                            autoHeight={true}
                            onCellEditCommit={onRowEditCommit}
                        />
                    </Box>
                    <section className={classes.buttons}>
                        <Button className={classes.buttonCreate}
                            variant="contained" color="primary"
                            size="large"
                            type="submit"
                            onClick={verifySurveyData}
                        >
                            Save
                        </Button>
                        <Button
                            className={classes.buttonCancel}
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </section>
                    {
                        errorsList.map(error => <Alert severity="error" style={{marginTop:"10px"}}>{error}</Alert>)
                    }
                </Grid>
            </Paper>
        </Box>
    );
};

export default DirectionalSurveyTable;
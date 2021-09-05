import React, {useCallback, useState} from 'react';
import {Button, createStyles, createTheme, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

const DirectionalSurveyTable = ({handleClose, setSurveyDataInserted, setValidSurveyData}) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const columns = [
        { field: 'id', headerName: 'id', flex: 1/10, editable: false, sortable: false, type: 'number'},
        { field: 'md', headerName: 'MD [feet]', description:"Middle Depth in ft",  flex:2.2/10, editable: true, sortable: false, type: "number",
            renderCell: (params) => validateNumbersColumnRendering(params)
        },
        { field: 'tvd', headerName: 'TVD [feet]', description:"Middle Depth in ft", flex:2.2/10, editable: true, sortable: false, type: "number",
            renderCell: (params) => validateNumbersColumnRendering(params)
        },
        { field: 'hd', headerName: 'HD [feet]', description:"Horizontal Depth", flex:2.2/10, editable: false, sortable: false , type: 'number',
            valueFormatter: (params) => (params.value === "") ? "" : parseFloat(params.value).toFixed(3),
            valueGetter: (params) => {
                if (params.id > 1 && params.getValue(params.id, "tvd") !== "" && params.getValue(params.id, "md") !== "") {
                    const currentMD = parseFloat(params.getValue(params.id, "md"));
                    const currentTVD = parseFloat(params.getValue(params.id, "tvd"));
                    const previousMD = parseFloat(params.getValue(params.id - 1, "md"));
                    const previousTVD = parseFloat(params.getValue(params.id - 1, "tvd"));
                    const previousHD = parseFloat(params.getValue(params.id - 1, "hd"));

                    if (Math.round(currentMD - currentTVD) > 0) {
                        return calculateHorizontalDistance(currentMD, currentTVD, previousMD, previousTVD, previousHD);
                    } else {
                        return 0;
                    }
                } else {
                    return params.value;
                }
            }
        },
        { field: 'angle', headerName: 'Angle [degrees]', flex:2.4/10, editable: false, sortable: false, type: 'number',
            valueFormatter: (params) => (params.value === "") ? "" : parseFloat(params.value).toFixed(3),
            valueGetter: (params) => {
                if (params.id > 1 && params.getValue(params.id, "tvd") !== "" && params.getValue(params.id, "md") !== "") {
                    const currentMD = parseFloat(params.getValue(params.id, "md"));
                    const currentTVD = parseFloat(params.getValue(params.id, "tvd"));
                    const previousMD = parseFloat(params.getValue(params.id - 1, "md"));
                    const previousTVD = parseFloat(params.getValue(params.id - 1, "tvd"));

                    if (Math.round(currentMD - currentTVD) > 0) {
                        return calculateAngle(currentMD, currentTVD, previousMD, previousTVD);
                    } else {
                        return 0;
                    }
                } else {
                    return params.value;
                }
            }
       }
    ];

    const calculateHorizontalDistance = (currentMD, currentTVD, previousMD, previousTVD, previousHD) => {
        let correlationHD = Math.pow((currentMD - previousMD), 2) - Math.pow((currentTVD - previousTVD), 2);
        correlationHD = Math.sqrt(correlationHD);
        correlationHD = Math.round(correlationHD) + parseInt(previousHD);

        return correlationHD;
    }

    const calculateAngle = (currentMD, currentTVD, previousMD, previousTVD) => {
        let correlationAngle = Math.asin((currentTVD - previousTVD) / (currentMD - previousMD)) * (180 / Math.PI);
        correlationAngle = 90 - Math.abs(correlationAngle);

        return correlationAngle;
    }

    function validateNumbersColumnRendering(numberStr) {
        const numberValue = parseFloat(numberStr.value);
        if (!isNaN(numberValue)){
            if (numberValue >= 0){
                return (
                    <div style={{width: "100%", height: "100%",
                        border: "1px solid",
                        backgroundColor: 'rgb(212, 237, 218)',
                        borderColor: '#c3e6cb'}}>
                        {(numberValue.toFixed(3))}
                    </div>
                )
            } else {
                return (
                    <div style={{width: "100%", height: "100%", color: '#721c24',
                        border: "1px solid",
                        backgroundColor: '#f8d7da',
                        borderColor: '#f5c6cb'}}>
                        {(numberValue.toFixed(3))}
                    </div>
                )
            }
        } else {
            return (
                <div style={{width: "100%", height: "100%",
                    border: "1px solid",
                    backgroundColor: '#ffffff',
                    borderColor: 'rgba(224, 224, 224, 1)'}}>
                </div>
            )
        }
    }

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
        })
    );

    function getThemePaletteMode(palette) {
        return palette.type || palette.mode;
    }

    const defaultTheme = createTheme();
    const tableStyles = makeStyles(
        (theme) => {
            const isDark = getThemePaletteMode(theme.palette)  === 'dark';

            return {
                root: {
                    '& .MuiDataGrid-cell--editing': {
                        backgroundColor: 'rgb(255,215,115, 0.19)',
                        color: '#1a3e72',
                    },
                    '& .Mui-error': {
                        backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
                        color: isDark ? '#ff4343' : '#750f0f',
                    },
                    '& .MuiDataGrid-columnsContainer': {
                        backgroundColor: theme.palette.primary.main,
                        justifyContent: "center",
                        color: "white"
                    },
                    '& .MuiDataGrid-cell--editable': {
                        // backgroundColor: 'rgb(217 243 190)',
                        border: "1px solid white"
                    }
                }
            };
        },
        { defaultTheme },
    );
    const [updatedRows, setUpdatedRows] = useState(surveyRows);

    const onRowEditCommit= (params) =>{
        // //Get edited row by id
        // const editedRow = params.api.getRow(params.id);
        // //update local object with rows
        // setUpdatedRows({
        //     ...updatedRows,
        //     [params.id - 1]: editedRow
        // });

        const rowModels = params.api.getRowModels();
        console.log(rowModels);
    }

    const classes = styles();
    const tableClasses = tableStyles();
    const maxDecimals = "0.001";

    // const [rows, setRows] = useState(surveyRows);

    // const handleCellEditCommit = useCallback(
    //     ({ id, field, value }) => {
    //         if (field === 'hd') {
    //             const [md, tvd] = value.toString().split(' ');
    //             const updatedRows = rows.map((row) => {
    //                 if (row.id === id) {
    //                     return { ...row, md, tvd };
    //                 }
    //                 return row;
    //             });
    //             setRows(updatedRows);
    //         }
    //     },
    //     [rows],
    // );

    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.paper}>

                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center" style={{width: "1200px"}}>

                    <Typography variant="h6" className={classes.text}>Insert Direction Survey Data</Typography>

                    <div style={{width: '600px', paddingTop: "10px", marginBottom:"20px", }}>
                        <DataGrid
                            inputProps={{step: maxDecimals, min: "0"}}
                            isCellEditable={(params => params.id !== 1)}
                            className={tableClasses.root}
                            rows={surveyRows}
                            columns={columns}
                            editRowsModel={editRowsModel}
                            onEditRowsModelChange={handleEditRowsModelChange}
                            hideFooter={true}
                            disableExtendRowFullWidth={true}
                            rowHeight={30}
                            disableColumnFilter={true}
                            disableColumnMenu={true}
                            autoHeight={true}
                            onCellEditStop={onRowEditCommit}
                        />
                    </div>

                    <section className={classes.buttons}>
                        <Button className={classes.buttonCreate}
                                variant="contained" color="primary"
                                size="large"
                                type="submit"
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

const createRow = (id, md, tvd, hd, angle) => {
    return {id, md, tvd, hd, angle};
}

const createSurveyRows = () => {
    const data =[]
    data.push(createRow(1,0,0,0, 0));

    for (let row = 2; row <= 20; row++) {
       data.push(createRow(row, "", "", "", ""));
    }

    return data;
}

const surveyRows = createSurveyRows();

export default DirectionalSurveyTable;
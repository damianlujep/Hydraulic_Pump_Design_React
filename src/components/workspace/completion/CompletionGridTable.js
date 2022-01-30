import React, {useCallback, useState} from 'react';

import {Typography} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {DataGrid} from '@mui/x-data-grid';

import CompletionDialog from "./CompletionDialog";

const CompletionGridTable = ({ validCompletionData, tubingList, casingList }) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    function validateNumbersColumnRendering(numberStr) {
        const numberValue = parseFloat(numberStr.value);
        if (!isNaN(numberValue)){
            if (numberValue > 0){
                return (
                    <div style={{width: "100%", height: "100%", color: '#155724',
                        border: "1px solid",
                        backgroundColor: '#d4edda',
                        borderColor: '#c3e6cb', textAlign: "right"}}>
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
                <div style={{width: "100%", height: "100%", color: '#721c24',
                    border: "1px solid",
                    backgroundColor: '#f8d7da',
                    borderColor: '#f5c6cb'}}>
                    Error
                </div>
            )
        }
    }

    const columns = [
        { field: 'description', headerName: 'Description', minWidth: 350, editable: false, sortable: false},
        { field: 'number', headerName: 'Number', description:"Click to edit",  flex:0.5, editable: false, sortable: false, type: 'number',
            valueFormatter: (params) => {
                return params.value.toFixed(3);
            },
            renderCell: (params) => validateNumbersColumnRendering(params),
        },
        { field: 'unit', headerName: 'Unit', flex:0.3, editable: false, sortable: false }
    ];

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiDataGrid-cell--editing': {
                backgroundColor: 'rgb(255,215,115, 0.19)',
                color: '#1a3e72',
            },
            '& .Mui-error': {
                backgroundColor: `rgb(126,10,15, 0.1})`,
                color: '#750f0f',
            },
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme.palette.primary.main,
                justifyContent: "center",
                color: "white"
            },
            '& .MuiDataGrid-columnHeader': {
                backgroundColor: theme.palette.primary.main,
                color: "white"
            }
            /*           '& .MuiDataGrid-cell--editable': {
                          backgroundColor: 'rgb(217 243 190)'
                       },*/
        },
    }));

    const classes =  useStyles();

    return (
        <section style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <div style={{width: '550px', paddingBottom:"10px"}}>
                <DataGrid
                    className={classes.root}
                    rows={completionRows(validCompletionData)}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    hideFooter={true}
                    disableExtendRowFullWidth={true}
                    rowHeight={30}
                    disableColumnFilter={true}
                    disableColumnMenu={true}
                    headerHeight={30}
                    autoHeight={true}
                />
            </div>

            <Typography variant={"subtitle2"} style={{fontWeight: "bold", textAlign: "center"}}>
                Number of casing pipes: <span
                style={{fontWeight: "normal"}}>{validCompletionData.numberCasingPipes}</span>
            </Typography>
            <Typography variant={"subtitle2"} style={{fontWeight: "bold", textAlign: "center"}}>
                Casing (Size [in] - [lbs / ft)): <span
                style={{fontWeight: "normal"}}>{validCompletionData.casingID}</span>
            </Typography>

            <div style={{width: '550px', paddingTop: "10px", paddingBottom:"10px"}}>
                <DataGrid
                    className={classes.root}
                    rows={casing(validCompletionData)}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    hideFooter={true}
                    disableExtendRowFullWidth={true}
                    rowHeight={30}
                    disableColumnFilter={true}
                    disableColumnMenu={true}
                    headerHeight={0}
                    autoHeight={true}
                />
            </div>

            <Typography variant={"subtitle2"} style={{fontWeight: "bold", textAlign: "center"}}>
                Number of production tubing: <span
                style={{fontWeight: "normal"}}>{validCompletionData.numberProductionTubings}</span>
            </Typography>
            <Typography variant={"subtitle2"} style={{fontWeight: "bold", textAlign: "center"}}>
                Tubing (Size [in] - [lbs / ft)): <span
                style={{fontWeight: "normal"}}>{validCompletionData.tubingID}</span>
            </Typography>

            <div style={{width: '550px', paddingTop: "10px", paddingBottom:"15px"}}>
                <DataGrid
                    className={classes.root}
                    rows={tubing(validCompletionData)}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    hideFooter={true}
                    disableExtendRowFullWidth={true}
                    rowHeight={30}
                    disableColumnFilter={true}
                    disableColumnMenu={true}
                    headerHeight={0}
                    autoHeight={true}
                />
            </div>

            <CompletionDialog
                buttonLabel="Edit Completion Data"
                appBarLabel="Edit Completion Data Form"
                tubingList={tubingList}
                casingList={casingList}
            />
        </section>
    );
};

const createData = (id, description, number, unit) => {
    return {id, description, number, unit};
}

const completionRows = (validCompletionData) => {
    return [
        createData(1,'Length at middle depth of shots, MD:', validCompletionData.lengthOfShots, "ft"),
        createData(2, 'Middle shooting depth, TVD:', validCompletionData.averageShotDepth, "ft"),
        createData(3,'Pump settling length, MD:', validCompletionData.pumpSettlementLength, "ft"),
        createData(4,'Pump settling depth, TVD:', validCompletionData.pumpSettlementDepth, "ft"),
    ];
}

const casing = (validCompletionData) => {
    const casingValues = [];
    casingValues.push(createData(1, 'Casing length 1:', validCompletionData.casingLength1, "ft"));
    casingValues.push(createData(2, 'Outer casing diameter 1:', validCompletionData.ODCasing1, "in"));
    casingValues.push(createData(3, 'Inner diameter of casing 1:', validCompletionData.IDCasing1, "in"));
    if (validCompletionData.numberCasingPipes > 1) {
        casingValues.push(createData(4, 'Casing length 2:', validCompletionData.casingLength2, "ft"));
        casingValues.push(createData(5, 'Outer casing diameter 2:', validCompletionData.ODCasing2, "in"));
        casingValues.push(createData(6, 'Inner diameter of casing 2:', validCompletionData.IDCasing2, "in"));
    }
    if (validCompletionData.numberCasingPipes === 3) {
        casingValues.push(createData(7, 'Casing length 3:', validCompletionData.casingLength3, "ft"));
        casingValues.push(createData(8, 'Outer casing diameter 3:', validCompletionData.ODCasing3, "in"));
        casingValues.push(createData(9, 'Inner diameter of casing 3:', validCompletionData.IDCasing3, "in"));
    }
    return casingValues;
}

const tubing = (validCompletionData) => {
    const tubingValues = [];
    tubingValues.push(createData(1, 'Tubing length 1:', validCompletionData.tubingLength1, "ft"));
    tubingValues.push(createData(2, 'Outer tubing diameter 1:', validCompletionData.ODTubing1, "in"));
    tubingValues.push(createData(3, 'Inner tubing diameter 1:', validCompletionData.IDTubing1, "in"));
    if (validCompletionData.numberProductionTubings > 1) {
        tubingValues.push(createData(4, 'Tubing length 2:', validCompletionData.tubingLength2, "ft"));
        tubingValues.push(createData(5, 'Outer tubing diameter 2:', validCompletionData.ODTubing2, "in"));
        tubingValues.push(createData(6, 'Inner tubing diameter 2:', validCompletionData.IDTubing2, "in"));
    }
    if (validCompletionData.numberProductionTubings === 3) {
        tubingValues.push(createData(7, 'Tubing length 3:', validCompletionData.tubingLength3, "ft"));
        tubingValues.push(createData(8, 'Outer tubing diameter 3:', validCompletionData.ODTubing3, "in"));
        tubingValues.push(createData(9, 'Inner tubing diameter 3:', validCompletionData.IDTubing3, "in"));
    }
    return tubingValues;
}

export default CompletionGridTable;
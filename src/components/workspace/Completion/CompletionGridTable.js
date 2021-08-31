import React, {useCallback, useState} from 'react';
import CompletionDialog from "./CompletionDialog";
import {createTheme, makeStyles, Typography} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

const CompletionGridTable = () => {
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

    function getThemePaletteMode(palette) {
        return palette.type || palette.mode;
    }

    const defaultTheme = createTheme();
    const useStyles = makeStyles(
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
                    /*           '& .MuiDataGrid-cell--editable': {
                                  backgroundColor: 'rgb(217 243 190)'
                               },*/
                },
            };
        },
        { defaultTheme },
    );

    const classes =  useStyles();

    return (
        <section style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <div style={{width: '550px', paddingBottom:"10px"}}>
                <DataGrid
                    className={classes.root}
                    rows={completionRows}
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

            <Typography variant={"subtitle2"} style={{fontWeight:"bold", textAlign:"center"}}>Number of casing pipes: <span style={{fontWeight:"normal"}}>1</span></Typography>
            <Typography variant={"subtitle2"} style={{fontWeight:"bold", textAlign:"center"}}>Casing (Size [in] - [lbs / ft)):   <span style={{fontWeight:"normal"}}>2 3/8' (2.041) - 4.0 UN</span></Typography>


            <div style={{width: '550px', paddingTop: "10px", paddingBottom:"10px"}}>
                <DataGrid
                    className={classes.root}
                    rows={casing}
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

            <Typography variant={"subtitle2"} style={{fontWeight:"bold", textAlign:"center"}}> Number of production tubing: <span style={{fontWeight:"normal"}}>1</span></Typography>
            <Typography variant={"subtitle2"} style={{fontWeight:"bold", textAlign:"center"}}> Tubing (Size [in] - [lbs / ft)): <span style={{fontWeight:"normal"}}>5 1/2" (4.892) - 17.00</span></Typography>


            <div style={{width: '550px', paddingTop: "10px", paddingBottom:"15px"}}>
                <DataGrid
                    className={classes.root}
                    rows={tubing}
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

            <CompletionDialog/>
        </section>
    );
};

const createData = (id, description, number, unit) => {
    return {id, description, number, unit};
}

const completionRows = [
    createData(1,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(2, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(3,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(4,'Length at middle depth of shots MD', 8, "[ft]"),
];

const casing = [
    createData(1,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(2, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(3,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(4,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(5, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(6,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(7,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(8, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(9,'Length at middle depth of shots MD', 7, "[ft]")
];

const tubing = [
    createData(1,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(2, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(3,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(4,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(5, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(6,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(7,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(8, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(9,'Length at middle depth of shots MD', 7, "[ft]")
];

export default CompletionGridTable;
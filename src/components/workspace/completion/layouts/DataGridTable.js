import React, {useCallback, useState} from 'react';

import {createTheme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {DataGrid} from "@material-ui/data-grid";

const DataGridTable = () => {
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
        { field: 'name', headerName: 'Descriptions', minWidth: 350, editable: false, sortable: false},
        { field: 'calories', headerName: 'Number', description:"Click to edit",  flex:0.5, editable: true,  sortable: false, type: 'number',
            valueFormatter: (params) => {
                return params.value.toFixed(3);
            },
            renderCell: (params) => validateNumbersColumnRendering(params),
        },
        { field: 'fat', headerName: 'Unit', flex:0.3, editable: false, sortable: false }
    ];

    function getThemePaletteMode(palette) {
        return palette.mode || palette.mode;
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

    const classes2 =  useStyles();

    const [updatedRows, setUpdatedRows] = useState(rows);

    const onRowEditCommit= (params) =>{
        //Get edited row by id
        const editedRow = params.api.getRow(params.id);
        //update local object with rows
        setUpdatedRows({
            ...updatedRows,
            [params.id - 1]: editedRow
        });

        //Get all current data with changes
        const rowModels = params.api.getRowModels();
        //Convert rowModels from Map to Array
        const json = [];
        Array.from(rowModels.values()).map(key => {
            json.push(key);
        });
    }

    return (
        <div style={{width: '550px'}}>
            <DataGrid
                className={classes2.root}
                rows={rows}
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
                onCellEditStop={onRowEditCommit}
                // onCellEditCommit={onRowEditCommit}
                // onRowEditCommit={onRowEditCommit}
            />
        </div>
    );
};

function createData(id, name, calories, fat) {
    return {id, name, calories, fat };
}

const rows = [
    createData(1,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(2, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(3,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(4,'Length at middle depth of shots MD', 8, "[ft]"),

    createData(5,'Middle shooting depth TVD:', 9, "[ft]"),
    createData(6,'Pump settling length MD:', 0.2, "[ft]"),
    createData(7,'Pump settling depth', 10, "[ft]"),
    createData(8,'Middle shooting depth TVD:', 0.1, "[ft]"),
    createData(9,'Pump settling length MD:', 11, "[ft]"),
    createData(10,'Pump settling depth', 12, "[ft]"),
    createData(11,'Middle shooting depth TVD:', 0, "[in]"),
    createData(12,'Pump settling length MD:', 0.55555, "[in]"),
    createData(13,'Pump settling depth', 666666, "[in]"),

    createData(14,'Pump settling length MD:', 0.55555, "[in]"),
    createData(15,'Pump settling depth', 666666, "[in]"),
    createData(16,'Middle shooting depth TVD:', 0.12344565345, "[in]"),
    createData(17,'Pump settling length MD:', 0, "[in]"),
    createData(18,'Pump settling depth', 666666, "[in]"),
    createData(19,'Middle shooting depth TVD:', 0, "[in]"),
    createData(20,'Pump settling length MD:', 0.55555, "[in]"),
    createData(21,'Pump settling depth', 666666, "[in]"),
    createData(22,'Middle shooting depth TVD:', 0., "[in]")
];

export default DataGridTable;
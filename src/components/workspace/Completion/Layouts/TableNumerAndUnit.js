import React from 'react';
import {
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

const TableNumerAndUnit = () => {
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    function createData(name, calories, fat) {
        return { name, calories, fat };
    }

    const rows = [
        createData('Length at middle depth of shots MD', 1000000, "[ft]"),
        createData('Length at middle depth of shots MD', 12222123, "[ft]"),
        createData('Length at middle depth of shots MD', 4445, "[ft]"),
        createData('Length at middle depth of shots MD', 77788, "[ft]"),

        createData('Middle shooting depth TVD:', 0.12344565345, "[ft]"),
        createData('Pump settling length MD:', 0.55555, "[ft]"),
        createData('Pump settling depth', 666666, "[ft]"),
        createData('Middle shooting depth TVD:', 0.12344565345, "[ft]"),
        createData('Pump settling length MD:', 0.55555, "[ft]"),
        createData('Pump settling depth', 666666, "[ft]"),
        createData('Middle shooting depth TVD:', 0.12344565345, "[in]"),
        createData('Pump settling length MD:', 0.55555, "[in]"),
        createData('Pump settling depth', 666666, "[in]"),

        createData('Pump settling length MD:', 0.55555, "[in]"),
        createData('Pump settling depth', 666666, "[in]"),
        createData('Middle shooting depth TVD:', 0.12344565345, "[in]"),
        createData('Pump settling length MD:', 0.55555, "[in]"),
        createData('Pump settling depth', 666666, "[in]"),
        createData('Middle shooting depth TVD:', 0.12344565345, "[in]"),
        createData('Pump settling length MD:', 0.55555, "[in]"),
        createData('Pump settling depth', 666666, "[in]"),
        createData('Middle shooting depth TVD:', 0.12344565345, "[in]"),
    ];

    const tableWidth = 550;
    const useStyles = makeStyles({
        table: {
            width: tableWidth,
            lineHeight: ""
        },
        label:{
            width: tableWidth * 0.8,
            height: "10px",
        },
        number:{
            width: tableWidth * 0.1,
            height: "10px",
            fontWeight: "bold",
            color: "#3f51b5"
        },
        unit:{
            width: tableWidth * 0.1,
            height: "10px",
            color: "cornflowerblue"
        }
    });

    const classes = useStyles();

    return (
        <div>
            <TableContainer style={{width: tableWidth}} component={Paper}>
                <Table size="small" className={classes.table} aria-label="customized table">
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell align="normal" className={classes.label}>{row.name}</StyledTableCell>
                                <StyledTableCell align="right" className={classes.number}>{row.calories}</StyledTableCell>
                                <StyledTableCell align="left" className={classes.unit}>{row.fat}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.editCompletionButton}>
                <IconButton color="primary" aria-label="Edit completion data" >
                    <Edit />
                </IconButton>
                <Typography variant="body1" color="primary">Edit completion data</Typography>
            </div>
        </div>
    );
};

export default TableNumerAndUnit;
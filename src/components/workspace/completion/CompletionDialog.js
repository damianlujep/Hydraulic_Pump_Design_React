import React, {useState} from 'react';

import {AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {Close, Edit} from "@mui/icons-material";

import CompletionForm from "./CompletionForm";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        maxHeight: '45px',
        justifyContent: 'center'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CompletionDialog = ({ buttonLabel, appBarLabel, tubingList, casingList }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={handleClickOpen}
            >
                {buttonLabel}
            </Button>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar style={{minHeight: "45px"}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            size="large">
                            <Close />
                        </IconButton>
                        <Typography variant="subtitle1" className={classes.title}>
                            {appBarLabel}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <CompletionForm
                    handleClose={handleClose}
                    tubingList={tubingList}
                    casingList={casingList}
                />
            </Dialog>
        </Box>
    );
};

export default CompletionDialog;
import React, {useState} from 'react';

import {AppBar, Button, Dialog, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {Close, Edit} from "@mui/icons-material";

import DirectionalSurveyTable from "./DirectionalSurveyTable";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DirectionalSurveyDialog = ({buttonLabel, appBarLabel}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
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
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            size="large">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {appBarLabel}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DirectionalSurveyTable
                    handleClose={handleClose}
                />
            </Dialog>
        </div>
    );
};

export default DirectionalSurveyDialog;
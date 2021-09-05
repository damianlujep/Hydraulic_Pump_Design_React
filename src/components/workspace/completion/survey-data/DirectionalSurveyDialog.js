import React, {useState} from 'react';
import {AppBar, Button, Dialog, IconButton, makeStyles, Slide, Toolbar, Typography} from "@material-ui/core";
import {Close, Edit} from "@material-ui/icons";
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

const DirectionalSurveyDialog = ({buttonLabel, appBarLabel, setSurveyDataInserted, setValidSurveyData}) => {
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
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {appBarLabel}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DirectionalSurveyTable
                    handleClose={handleClose}
                    setSurveyDataInserted={setSurveyDataInserted}
                    setValidSurveyData={setValidSurveyData}
                />
            </Dialog>
        </div>
    );
};

export default DirectionalSurveyDialog;
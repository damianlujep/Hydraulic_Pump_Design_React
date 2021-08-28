import React, {useState} from 'react';
import {AppBar, Button, Dialog, IconButton, makeStyles, Slide, Toolbar, Typography} from "@material-ui/core";
import {Close, Edit} from "@material-ui/icons";
import NewProjectForm from "../../newproject/NewProjectForm";

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

const CompletionDialog = () => {
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
                Insert Completion Data
            </Button>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Completion Data Form
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <NewProjectForm/>
                {/*<List>*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                {/*    </ListItem>*/}
                {/*    <Divider />*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemText primary="Default notification ringtone" secondary="Tethys" />*/}
                {/*    </ListItem>*/}
                {/*</List>*/}
            </Dialog>
        </div>
    );
};

export default CompletionDialog;
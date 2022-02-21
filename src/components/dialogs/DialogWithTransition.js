import { forwardRef } from 'react';

import  { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogWithTransition = ({ open, setOpen, title, text, actionButtonName, actionButtonHandler}) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={actionButtonHandler}>{actionButtonName}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DialogWithTransition;
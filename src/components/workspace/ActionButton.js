import React from 'react';
import {Button} from "@material-ui/core";
import {KeyboardArrowDown} from "@material-ui/icons";

const ActionButton = ({handleClick, open, text, buttonID, styledMenuID}) => {
    return (
        <>
            <Button
                color="primary"
                id={buttonID}
                aria-controls={styledMenuID}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
            >
                {text}
            </Button>
        </>
    );
};

export default ActionButton;
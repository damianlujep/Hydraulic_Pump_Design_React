import React from 'react';

import {Button} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";

const ActionButton = ({handleClick, open, text, buttonID, styledMenuID}) => {
    return (
        <>
            <Button
                color="primary"
                size="small"
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
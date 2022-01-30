import {Button} from "@mui/material";

export const ButtonMainSmall = () => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="small">
        </Button>
    );
};

export const ButtonMainLarge = ({text}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
        >
            {text}
        </Button>
    );
};

export const ButtonCancel = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{padding: '8px', width: '100px', marginTop: '20px'}}
            onClick={onClick}
        > Cancel
        </Button>
    );
};
import React from 'react';
import {Typography} from "@material-ui/core";
import {Redirect} from "react-router-dom";

const NewProject = ({authorized}) => {
    if (!authorized){
        return <Redirect to="/"/>
    }

    return (
        <>
            <Typography variant="h1">To będzie strona po logowaniu</Typography>
        </>
    );
};

export default NewProject;
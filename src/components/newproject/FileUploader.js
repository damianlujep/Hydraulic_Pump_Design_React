import React, { useRef }  from 'react';

import { Button } from "@mui/material";
import { UploadRounded } from "@mui/icons-material";

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (!file){
            return null;
        }
        if (file.name.includes(".hpd")) {
            fileSelectSuccessHandler(file);
        } else {
            fileSelectErrorsHandler({ error: "Incorrect file format, try again" });
        }
    };

    const fileSelectSuccessHandler = (file) => {
        onFileSelectSuccess(file);
        onFileSelectError({});
    };

    const fileSelectErrorsHandler = (error) => {
        onFileSelectSuccess(null);
        onFileSelectError(error);
    };

    return (
        <label htmlFor="contained-button-file">
            <input
                accept=".hpd"
                id="contained-button-file"
                multiple
                type="file"
                style={{display: "none"}}
                onChange={handleFileInput}
                onClick={() => fileInput.current && fileInput.current.click()}
            />
            <Button
                sx={{ height: "82px", width: "380px", fontSize: "1.5rem" }}
                variant='contained'
                color="primary"
                component="span"
                startIcon={<UploadRounded/>}
            >
                upload from file
            </Button>
        </label>
    );
};

export default FileUploader;
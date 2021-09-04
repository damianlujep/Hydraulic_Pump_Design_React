import React, {useState} from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import CompletionDialog from "./CompletionDialog";
import DirectionalSurveyDialog from "./DirectionalSurveyDialog";
import CompletionGridTable from "./CompletionGridTable";
import {getSessionStorageOrDefault} from "../../service/SessionStorageService";

const Completion = () => {
    const [completionDataInserted, setCompletionDataInserted] = useState(getSessionStorageOrDefault('completion-data-entered', false));
    const [validCompletionData, setValidCompletionData] = useState(getSessionStorageOrDefault('completion-data', {}));

    const styles = makeStyles((theme) =>
        createStyles({
            container: {
                minHeight: "calc(100vh - 120px - 48px - 8px - 48px)",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center"
            },
            editCompletionButton:{
                display: "flex",
                alignItems: "center",
                marginTop: "20px"
            }
        })
    );

    const classes = styles();

    const renderCompletionData = () => {
        if (completionDataInserted && validCompletionData !== {}){
            return <CompletionGridTable
                setCompletionDataInserted={setCompletionDataInserted}
                setValidCompletionData={setValidCompletionData}
                validCompletionData={validCompletionData}
            />
        } else {
            return <CompletionDialog
                buttonLabel="Insert Completion Data"
                appBarLabel="Completion Data Form"
                setCompletionDataInserted={setCompletionDataInserted}
                setValidCompletionData={setValidCompletionData}
            />
        }
    }

    return (
        <section className={classes.container}>
            {
                renderCompletionData()
            }

            <DirectionalSurveyDialog/>
        </section>
    );
};

export default Completion;
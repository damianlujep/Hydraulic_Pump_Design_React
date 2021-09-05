import React, {useState} from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import CompletionDialog from "./CompletionDialog";
import DirectionalSurveyDialog from "./survey-data/DirectionalSurveyDialog";
import CompletionGridTable from "./CompletionGridTable";
import {getSessionStorageOrDefault} from "../../service/SessionStorageService";

const Completion = () => {
    const [completionDataInserted, setCompletionDataInserted] = useState(getSessionStorageOrDefault('completion-data-entered', false));
    const [validCompletionData, setValidCompletionData] = useState(getSessionStorageOrDefault('completion-data', {}));

    const [surveyDataInserted, setSurveyDataInserted] = useState(getSessionStorageOrDefault('survey-data-entered', false));
    const [validSurveyData, setValidSurveyData] = useState(getSessionStorageOrDefault('survey-data', {}));

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

    const renderDirectionalSurveyData = () => {
        if (surveyDataInserted && validSurveyData !== {}){
            return <CompletionGridTable
                setCompletionDataInserted={setCompletionDataInserted}
                setValidCompletionData={setValidCompletionData}
                validCompletionData={validCompletionData}
            />
        } else {
            return <DirectionalSurveyDialog
                buttonLabel="Insert Directional Survey Data"
                appBarLabel="Direction Survey Data"
                setSurveyDataInserted={setSurveyDataInserted}
                setValidSurveyData={setValidSurveyData}
            />
        }
    }

    return (
        <section className={classes.container}>
            {
                renderCompletionData()
            }
            {
                renderDirectionalSurveyData()
            }
        </section>
    );
};

export default Completion;
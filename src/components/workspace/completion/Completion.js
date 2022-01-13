import React, {useEffect} from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import CompletionDialog from "./CompletionDialog";
import DirectionalSurveyDialog from "./survey-data/DirectionalSurveyDialog";
import CompletionGridTable from "./CompletionGridTable";
import ChartTemplate from "../../charts/ChartTemplate";
import {useDispatch, useSelector} from "react-redux";
import {fetchCasingData, fetchTubingData} from "../../store/completion-fetch-actions";

const Completion = () => {
    const dispatch = useDispatch();
    const validCompletionData = useSelector(state => state.completion.validCompletionData);
    const completionDataEntered = useSelector(state => state.completion.completionDataEntered);

    const validSurveyData = useSelector(state => state.completion.validSurveyData);
    const surveyDataEntered = useSelector(state => state.completion.surveyDataEntered);

    const tubingList = useSelector(state => state.completion.tubingData);
    const casingList = useSelector(state => state.completion.casingData);

    //TubingList
    useEffect(() => {
        dispatch(fetchTubingData());
    },[dispatch]);

    //Casing List
    useEffect(() => {
        dispatch(fetchCasingData());
    },[dispatch]);

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
        console.log(tubingList)
        if (completionDataEntered && validCompletionData !== {}){
            return <CompletionGridTable
                validCompletionData={validCompletionData}
                tubingList={tubingList}
                casingList={casingList}
            />
        } else {
            return <CompletionDialog
                buttonLabel="Insert Completion Data"
                appBarLabel="Completion Data Form"
                tubingList={tubingList}
                casingList={casingList}
            />
        }
    }

    const renderDirectionalSurveyData = () => {
        if (surveyDataEntered && validSurveyData !== {}){
            return <ChartTemplate />

        } else {
            return <DirectionalSurveyDialog
                buttonLabel="Insert Directional Survey Data"
                appBarLabel="Direction Survey Data"
                // setSurveyDataInserted={setSurveyDataInserted}
                // setValidSurveyData={setValidSurveyData}
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
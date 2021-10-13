import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import CompletionDialog from "./CompletionDialog";
import DirectionalSurveyDialog from "./survey-data/DirectionalSurveyDialog";
import CompletionGridTable from "./CompletionGridTable";
import {getSessionStorageOrDefault} from "../../service/SessionStorageService";
import ChartTemplate from "../../charts/ChartTemplate";
import {API_URL} from "../../../api-constants";

const Completion = () => {
    const [completionDataInserted, setCompletionDataInserted] = useState(getSessionStorageOrDefault('completion-data-entered', false));
    const [validCompletionData, setValidCompletionData] = useState(getSessionStorageOrDefault('completion-data', {}));

    const [surveyDataInserted, setSurveyDataInserted] = useState(getSessionStorageOrDefault('survey-data-entered', false));
    const [validSurveyData, setValidSurveyData] = useState(getSessionStorageOrDefault('survey-data', {}));

    const [tubingList, seTubingList] = useState([]);
    const [casingList, setCasingList] = useState([]);
    const [selectedTubing, setSelectedTubing] = useState([]);
    const [selectedCasing, setSelectedCasing] = useState([]);

    const tubingListURL = `${API_URL}/tubingAndCasing/tubingList`;
    const casingListURL = `${API_URL}/tubingAndCasing/casingList`;

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const authHeader = {
        'Authorization': sessionStorage.getItem("jwt")
    };

    //TubingList
    useEffect(() => {
        fetch(tubingListURL, {
            headers:authHeader
        })
            .then(data => data.json())
            .then(data => seTubingList(data));
    }, []);

    //Casing List
    useEffect(() => {
        fetch(casingListURL, {
            headers:authHeader
        })
            .then(data => data.json())
            .then(data => setCasingList(data));
    }, []);

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
        if (completionDataInserted && validCompletionData !== {}){
            return <CompletionGridTable
                setCompletionDataInserted={setCompletionDataInserted}
                setValidCompletionData={setValidCompletionData}
                validCompletionData={validCompletionData}
                tubingList={tubingList}
                casingList={casingList}
            />
        } else {
            return <CompletionDialog
                buttonLabel="Insert Completion Data"
                appBarLabel="Completion Data Form"
                setCompletionDataInserted={setCompletionDataInserted}
                setValidCompletionData={setValidCompletionData}
                tubingList={tubingList}
                casingList={casingList}
            />
        }
    }

    const renderDirectionalSurveyData = () => {
        if (surveyDataInserted && validSurveyData !== {}){
            return <ChartTemplate setSurveyDataInserted={setSurveyDataInserted} setValidSurveyData={setValidSurveyData}/>

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
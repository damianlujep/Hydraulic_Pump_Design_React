import React from "react";
import {Line} from 'react-chartjs-2';
import DirectionalSurveyDialog from "../workspace/completion/survey-data/DirectionalSurveyDialog";


const ChartTemplate = (setSurveyDataInserted, setValidSurveyData) => (
    <div style={{width: "800px", height:"auto", display:"flex",flexDirection:"column", justifyContent: "center", alignItems: "center"}}>

        <Line data={data} options={options} style={{marginBottom:"20px"}}/>

        <DirectionalSurveyDialog
            buttonLabel="Edit Directional Survey Data"
            appBarLabel="Edit Direction Survey Data"
            setSurveyDataInserted={setSurveyDataInserted}
            setValidSurveyData={setValidSurveyData}
        />
    </div>
);

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'MD',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255,99,99)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-1',
        },
        {
            label: 'TVD',
            data: [1, 2, 1, 1, 2, 2],
            fill: false,
            backgroundColor: 'rgb(63,178,143)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-axis-2',
        },
        {
            label: 'HD',
            data: [1.1, 2.4, 3, 1, 2, 2],
            fill: false,
            backgroundColor: 'rgb(4,78,184)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-axis-1',
        },
        {
            label: 'Angle',
            data: [4, 2, 3, 1, 4, 2],
            fill: false,
            backgroundColor: 'rgb(183,187,59)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-axis-2',
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
            },
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    drawOnArea: false,
                },
            }

        ],
    },
};
export default ChartTemplate;
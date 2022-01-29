import React from 'react';

import {
    CartesianGrid,
    Label,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {makeStyles} from "@mui/styles";

import DirectionalSurveyDialog from "../workspace/completion/survey-data/DirectionalSurveyDialog";

const surveyData = [
    {
        md: 0,
        tvd: 0,
        hd: 0,
        angle: 0
    },
    {
        md: 349,
        tvd: 349,
        hd: 0,
        angle: 0
    },
    {
        md: 698,
        tvd: 698,
        hd: 0,
        angle: 0
    },
    {
        md: 1000,
        tvd: 999.8,
        hd: 0,
        angle: 0
    },
    {
        md: 1400,
        tvd: 1397,
        hd: 47,
        angle: 7
    },
    {
        md: 1786,
        tvd: 1777,
        hd: 115,
        angle: 10
    },
    {
        md: 2073,
        tvd: 2054,
        hd: 190,
        angle: 15
    },
    {
        md: 2458,
        tvd: 2413,
        hd: 329,
        angle: 21
    },
    {
        md: 2843,
        tvd: 2752,
        hd: 512,
        angle: 28
    },
    {
        md: 3323,
        tvd: 3153,
        hd: 776,
        angle: 33
    },
    {
        md: 3802,
        tvd: 3519,
        hd: 1085,
        angle: 40
    },
    {
        md: 4282,
        tvd: 3831,
        hd: 1449,
        angle: 49
    },
    {
        md: 4858,
        tvd: 4163,
        hd: 1920,
        angle: 55
    },
    {
        md: 5672,
        tvd: 4554,
        hd: 2634,
        angle: 61
    },
    {
        md: 6343,
        tvd: 4893,
        hd: 3213,
        angle: 60
    },
    {
        md: 7012,
        tvd: 5222,
        hd: 3796,
        angle: 61
    },
    {
        md: 7770,
        tvd: 5595,
        hd: 4455,
        angle: 61
    },
    {
        md: 8511,
        tvd: 5957,
        hd: 5102,
        angle: 61
    },
    {
        md: 8766,
        tvd: 6083,
        hd: 5324,
        angle: 60
    },
    {
        md: 8847,
        tvd: 6123,
        hd: 5394,
        angle: 60
    },
];

const useStyles = makeStyles(() => ({
    customTooltipWrapper: {
        backgroundColor: "white",
        fontSize: "13px",
        padding: "5px", border: "1px solid lightgray", textAlign: "center"
    },
    customTooltipKey: {
        fontWeight: "bold",
        color: "#00CED1"
    },
    chartWrapper: {
        width: "800px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    axisLabel: {
        fill: "#000000A5",
        fontWeight: "bold"
    }
}));

const DirectionalSurveyChart = () => {
    const classes = useStyles();

    const CustomTooltip = ({ payload, label, active }) => {
        if (active) {
            if (payload[1].name === "MD [ft]"){
                return (
                    <div className={classes.customTooltipWrapper}>
                        <p><span className={classes.customTooltipKey}>TVD:</span> {payload[0].payload.tvd} ft</p>
                        <p><span className={classes.customTooltipKey}>HD:</span> {payload[0].payload.hd} ft</p>
                    </div>
                );
            } else if (payload[1].name === "Angle °"){
                return (
                    <div className={classes.customTooltipWrapper}>
                        <p><span className={classes.customTooltipKey}>TVD:</span> {payload[0].payload.tvd} ft</p>
                        <p><span className={classes.customTooltipKey}>Angle:</span> {payload[0].payload.angle}°</p>
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className={classes.chartWrapper}>
            <ResponsiveContainer width={650} aspect={1}>
                <ScatterChart
                    width={500}
                    height={300}
                    data={surveyData}
                    margin={{top: 5, right: 30, left: 20, bottom: 40}}
                >
                    {/*TVD vs HD, ANGLE vs HD*/}
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>

                    <XAxis type="number" dataKey="angle" xAxisId="bottom" tickCount={6}>
                        <Label className={classes.axisLabel} value="Angle °" offset={5} position="bottom" />
                    </XAxis>
                    <XAxis type="number" dataKey="hd" xAxisId="top" orientation="top" tickCount={20}>
                        <Label className={classes.axisLabel} value="HD [ft]" offset={5} position="top" />
                    </XAxis>

                    <YAxis type="number" yAxisId="left" reversed={true} tickCount={10}>
                        <Label className={classes.axisLabel} value="TVD [ft]" offset={5} angle={-90} position="left" />
                    </YAxis>
                    <YAxis orientation="right" type="number" yAxisId="right" reversed={true} tickCount={10}>
                        <Label className={classes.axisLabel} value="TVD [ft]" offset={5} angle={90} position="right" />
                    </YAxis>

                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={60} />

                    <Scatter
                        line
                        fill="blue"
                        name="Angle °"
                        xAxisId="bottom"
                        yAxisId="left"
                        type="monotone"
                        dataKey="tvd"
                        strokeWidth={1.5}
                    />
                    <Scatter
                        line
                        fill="green"
                        name="MD [ft]"
                        xAxisId="top"
                        yAxisId="right"
                        type="monotone"
                        dataKey="tvd"
                        strokeWidth={1.5}
                        shape={"circle"}
                    />
                </ScatterChart>
            </ResponsiveContainer>

            <DirectionalSurveyDialog
                buttonLabel="Edit Directional Survey Data"
                appBarLabel="Edit Direction Survey Data"
            />
        </div>
    );
};

export default DirectionalSurveyChart;
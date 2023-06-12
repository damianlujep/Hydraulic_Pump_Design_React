import React, { useState } from 'react';
import { useSelector } from "react-redux";

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
import { makeStyles } from "@mui/styles";

import SurveyService from "../service/SurveyService";

import DirectionalSurveyDialog from "../workspace/completion/survey-data/DirectionalSurveyDialog";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../../api-constants";

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
    const [mdValue, setMdValue] = useState("");
    const [interpolatedTvd, setInterpolatedTvd] = useState("");
    const classes = useStyles();
    const validSurveyData = useSelector(
        state => state.completion.validSurveyData
    );
    const cleanedDataForChart = SurveyService.cleanSurveyDataForChart(validSurveyData);
    const auth = useAuth();

    const CustomTooltip = ({ payload, label, active }) => {
        if (active) {
            if (payload[1].name === "MD [ft]"){
                return (
                    <div className={classes.customTooltipWrapper}>
                        <p><span className={classes.customTooltipKey}>MD:</span> {payload[0].payload.md} ft</p>
                        <p><span className={classes.customTooltipKey}>TVD:</span> {payload[0].payload.tvd} ft</p>
                        <p><span className={classes.customTooltipKey}>HD:</span> {payload[0].payload.hd} ft</p>
                    </div>
                );
            } else if (payload[1].name === "Angle °"){
                return (
                    <div className={classes.customTooltipWrapper}>
                        <p><span className={classes.customTooltipKey}>MD:</span> {payload[0].payload.md} ft</p>
                        <p><span className={classes.customTooltipKey}>TVD:</span> {payload[0].payload.tvd} ft</p>
                        <p><span className={classes.customTooltipKey}>Angle:</span> {payload[0].payload.angle}°</p>
                    </div>
                );
            }
        }
        return null;
    };

    const handleCalculateTVDForm = async (e) => {
        e.preventDefault();

        const authHeader = {
            'Authorization': auth.jwt,
            'Content-Type': 'application/json',
            'Accept':'application/json'
        };

        const payload = {
            mdValue: parseFloat(mdValue),
            surveyRows: validSurveyData
        }

        await fetch (`${API_URL}/numericalAnalysis/interpolate`, {
            headers: authHeader,
            method: "POST",
            body: JSON.stringify(payload)
        })
          .then(data => data?.json())
          .then(data => {
              data && setInterpolatedTvd(data);
          })
    }

    const textFieldBoxSx = {
        display: "flex",
        gap: "20px",
        margin: "20px 0",
        alignItems: "center"
    }

    const textFieldSx = {
        ".MuiOutlinedInput-input": {
            textAlign: "right",

        },
        ".MuiOutlinedInput-input:disabled": {
            color: "red",
            "-webkit-text-fill-color": "unset !important",
        }
    }

    return (
        <div className={classes.chartWrapper}>
            <ResponsiveContainer width={650} aspect={1}>
                <ScatterChart
                    width={500}
                    height={300}
                    data={ cleanedDataForChart }
                    margin={{top: 5, right: 30, left: 20, bottom: 40}}
                >
                    {/*TVD vs HD, ANGLE vs HD*/}
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />

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

                    <Tooltip  cursor={false} content={<CustomTooltip /> } />
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
            <form onSubmit={e => handleCalculateTVDForm(e)} style={textFieldBoxSx}>
                <TextField
                  sx={textFieldSx}
                  type="number"
                  helperText="Inserte MD para calcular TVD"
                  value={mdValue}
                  onChange={e => setMdValue(e.target.value)}
                  label="MD"
                  InputProps={{
                      endAdornment: <InputAdornment position="start">ft</InputAdornment>,
                  }}
                />
                <IconButton type="submit">
                    <ArrowForwardIosIcon />
                </IconButton>
                <TextField
                  sx={textFieldSx}
                  type="number"
                  helperText=" "
                  value={interpolatedTvd}
                  label="TVD"
                  disabled
                  InputProps={{
                      endAdornment: <InputAdornment position="start">ft</InputAdornment>,
                  }}
                />
            </form>
        </div>
    );
};

export default DirectionalSurveyChart;

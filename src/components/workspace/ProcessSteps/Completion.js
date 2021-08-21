import React, {useState} from 'react';
import {createStyles, makeStyles, Typography} from "@material-ui/core";

const Completion = () => {

    const [lengthOfShots, setLengthOfShots] = useState(100);
    const [averageShotDepth, setAverageShotDepth] = useState(100);
    const [pumpSettlementLength, setPumpSettlementLength] = useState(555);
    const [pumpSettlementDepth, setPumpSettlementDepth] = useState(555);

    const [numberProductionTubings, setNumberProductionTubings] = useState(1);
    const [numberCasingPipes, setNumberCasingPipes] = useState(0);

    const [tubingLength1, setTubingLength1] = useState(0);
    const [ODTubing1, setODTubing1] = useState(0);
    const [IDTubing1, setIDTubing1] = useState(0);

    const [tubingLength2, setTubingLength2] = useState(0);
    const [ODTubing2, setODTubing2] = useState(0);
    const [IDTubing2, setIDTubing2] = useState(0);

    const [tubingLength3, setTubingLength3] = useState(0);
    const [ODTubing3, setODTubing3] = useState(0);
    const [IDTubing3, setIDTubing3] = useState(0);

    const [casingLength1, setCasingLength2] = useState(0);
    const [ODCasing1, setODCasing2] = useState(0);
    const [IDCasing1, setIDCasing2] = useState(0);

    const [casingLength2, setCasingLength3] = useState(0);
    const [ODCasing2, setODCasing3] = useState(0);
    const [IDCasing2, setIDCasing3] = useState(0);

    const styles = makeStyles((theme) =>
        createStyles({
            container: {
                height: "100%",
                display: "flex",
                justifyContent: "space-around"
            }
        })
    );

    const classes = styles();

    const shotsAndDepthData = [
        `Length at middle depth of shots MD: ${lengthOfShots} [ft]`,
        `Middle shooting depth TVD: ${averageShotDepth} [ft]`,
        `Pump settling length MD: ${pumpSettlementLength} [ft]`,
        `Pump settling depth TVD: ${pumpSettlementDepth} [ft]`
    ];

    const tubingData = (index, tubingLength, ODTubing, IDTubing) => {
        return [
            `Tubing length ${index}: ${tubingLength} [ft]`,
            `Outer tubing diameter ${index}: ${ODTubing} [in]`,
            `Inner tubing of casing ${index}: ${IDTubing} [in]`
        ];
    }

    const casingData = (index, casingLength, ODCasing, IDCasing) => {
        return [
            `Casing length 1: ${casingLength} [ft]`,
            `Outer casing diameter 1: ${ODCasing} [in]`,
            `Inner diameter of casing 1: ${IDCasing} [in]`
        ];
    }

    function printTubing() {
        const data = [];
        for (let i = 1; i <= numberProductionTubings; i++) {
            tubingData(i, (`tubingLength${i}`), (`ODTubing${i}`), (`IDTubing${i}`))
                .map((el, index) =>
                    data.push(<Typography variant="body1" key={index}>{el}</Typography>));
        }

        return data;
    }

    return (
        <section className={classes.container}>
            <div>
                {
                    shotsAndDepthData.map((el, index) => <Typography variant="body1" key={index}>{el}</Typography>)
                }
                <hr/>
                {
                    printTubing()
                }
                <hr/>

                {/*{*/}
                {/*    casingData.map((el, index) => <Typography variant="body1" key={index}>{el}</Typography>)*/}
                {/*}*/}
            </div>
            <div>
                Chart
            </div>
        </section>
    );
};

export default Completion;
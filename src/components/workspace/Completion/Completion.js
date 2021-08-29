import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import CompletionDialog from "./CompletionDialog";
import DirectionalSurveyDialog from "./DirectionalSurveyDialog";


const Completion = () => {

    // const [lengthOfShots, setLengthOfShots] = useState(100);
    // const [averageShotDepth, setAverageShotDepth] = useState(100);
    // const [pumpSettlementLength, setPumpSettlementLength] = useState(555);
    // const [pumpSettlementDepth, setPumpSettlementDepth] = useState(555);
    //
    // const [numberProductionTubings, setNumberProductionTubings] = useState(3);
    // const [numberCasingPipes, setNumberCasingPipes] = useState(3);
    //
    // const [tubingLength1, setTubingLength1] = useState(100);
    // const [ODTubing1, setODTubing1] = useState(0);
    // const [IDTubing1, setIDTubing1] = useState(0);
    //
    // const [tubingLength2, setTubingLength2] = useState(0);
    // const [ODTubing2, setODTubing2] = useState(0);
    // const [IDTubing2, setIDTubing2] = useState(0);
    //
    // const [tubingLength3, setTubingLength3] = useState(0);
    // const [ODTubing3, setODTubing3] = useState(0);
    // const [IDTubing3, setIDTubing3] = useState(0);
    //
    // const [casingLength1, setCasingLength1] = useState(0);
    // const [ODCasing1, setODCasing1] = useState(0);
    // const [IDCasing1, setIDCasing1] = useState(0);
    //
    // const [casingLength2, setCasingLength2] = useState(0);
    // const [ODCasing2, setODCasing2] = useState(0);
    // const [IDCasing2, setIDCasing2] = useState(0);
    //
    // const [casingLength3, setCasingLength3] = useState(200);
    // const [ODCasing3, setODCasing3] = useState(0);
    // const [IDCasing3, setIDCasing3] = useState(0);
    //
    const styles = makeStyles((theme) =>
        createStyles({
            container: {
                height: "calc(100vh - 150px - 48px - 8px - 48px)",
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
    //
    // const shotsAndDepthData = [
    //     `Length at middle depth of shots MD: ${lengthOfShots} [ft]`,
    //     `Middle shooting depth TVD: ${averageShotDepth} [ft]`,
    //     `Pump settling length MD: ${pumpSettlementLength} [ft]`,
    //     `Pump settling depth TVD: ${pumpSettlementDepth} [ft]`
    // ];
    //
    // const tubingData = (index, tubingLength, ODTubing, IDTubing) => {
    //     return [
    //         `Tubing length ${index}: ${tubingLength} [ft]`,
    //         `Outer tubing diameter ${index}: ${ODTubing} [in]`,
    //         `Inner tubing of casing ${index}: ${IDTubing} [in]`
    //     ];
    // }
    //
    // const casingData = (index, casingLength, ODCasing, IDCasing) => {
    //     return [
    //         `Casing length ${index}: ${casingLength} [ft]`,
    //         `Outer casing diameter ${index}: ${ODCasing} [in]`,
    //         `Inner diameter of casing ${index}: ${IDCasing} [in]`
    //     ];
    // }
    //
    // function printTubingOrCasing(tubingOrCasing, numberVariable, dataArray) {
    //     const data = [];
    //     for (let i = 1; i <= numberVariable; i++) {
    //         dataArray(i, eval(`${tubingOrCasing.toLowerCase() + "Length"}${i}`), eval(`OD${tubingOrCasing + i}`), eval(`ID${tubingOrCasing + i}`))
    //             .map((el, index) =>
    //                 data.push(<Typography variant="body1" key={index}>{el}</Typography>));
    //     }
    //
    //     return data;
    // }

    return (
        <section className={classes.container}>
            <CompletionDialog/>
            <DirectionalSurveyDialog/>
        </section>
    );
};



function createData(id, name, calories, fat) {
    return {id, name, calories, fat };
}

const rows = [
    createData(1,'Length at middle depth of shots MD', 5, "[ft]"),
    createData(2, 'Length at middle depth of shots MD', 6, "[ft]"),
    createData(3,'Length at middle depth of shots MD', 7, "[ft]"),
    createData(4,'Length at middle depth of shots MD', 8, "[ft]"),

    createData(5,'Middle shooting depth TVD:', 9, "[ft]"),
    createData(6,'Pump settling length MD:', 0.2, "[ft]"),
    createData(7,'Pump settling depth', 10, "[ft]"),
    createData(8,'Middle shooting depth TVD:', 0.1, "[ft]"),
    createData(9,'Pump settling length MD:', 11, "[ft]"),
    createData(10,'Pump settling depth', 12, "[ft]"),
    createData(11,'Middle shooting depth TVD:', 0, "[in]"),
    createData(12,'Pump settling length MD:', 0.55555, "[in]"),
    createData(13,'Pump settling depth', 666666, "[in]"),

    createData(14,'Pump settling length MD:', 0.55555, "[in]"),
    createData(15,'Pump settling depth', 666666, "[in]"),
    createData(16,'Middle shooting depth TVD:', 0.12344565345, "[in]"),
    createData(17,'Pump settling length MD:', 0, "[in]"),
    createData(18,'Pump settling depth', 666666, "[in]"),
    createData(19,'Middle shooting depth TVD:', 0, "[in]"),
    createData(20,'Pump settling length MD:', 0.55555, "[in]"),
    createData(21,'Pump settling depth', 666666, "[in]"),
    createData(22,'Middle shooting depth TVD:', 0., "[in]")
];

export default Completion;
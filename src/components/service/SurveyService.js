const SurveyService = {
    createSurveyInitialRows: () => {
        const data =[]
        data.push(createSurveyInitialRow(1,0,0,0, 0));
        for (let row = 2; row <= 20; row++) {
            data.push(createSurveyInitialRow(row, "", "", "", ""));
        }
        return data;
    },
    //Survey Dta calculations
    calculateHorizontalDistance: (currentMD, currentTVD, previousMD, previousTVD, previousHD) => {
        let correlationHD = Math.pow((currentMD - previousMD), 2) - Math.pow((currentTVD - previousTVD), 2);
        correlationHD = Math.sqrt(correlationHD);
        correlationHD = Math.round(correlationHD) + parseInt(previousHD);
        return correlationHD;
    },
    //Survey Dta calculations
    calculateAngle: (currentMD, currentTVD, previousMD, previousTVD) => {
        let correlationAngle = Math.asin((currentTVD - previousTVD) / (currentMD - previousMD)) * (180 / Math.PI);
        correlationAngle = 90 - Math.abs(correlationAngle);
        return correlationAngle;
    },
    cleanSurveyDataForChart: (surveyDataArr) => {
        return surveyDataArr
            .filter(el => el.md !== ("" && null) && el.tvd !== ("" && null))
            .map(el => el);
    },
};

const createSurveyInitialRow = (id, md, tvd, hd, angle) => {
    return { id, md, tvd, hd, angle };
};

export default SurveyService;
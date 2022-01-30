import {createSlice} from "@reduxjs/toolkit";

import {getSessionStorageOrDefault} from "../service/SessionStorageService";

const createSurveyInitialRows = () => {
   const data =[]
   data.push(createSurveyInitialRow(1,0,0,0, 0));
   for (let row = 2; row <= 20; row++) {
      data.push(createSurveyInitialRow(row, "", "", "", ""));
   }
   return data;
};

const createSurveyInitialRow = (id, md, tvd, hd, angle) => {
   return {id, md, tvd, hd, angle};
};

const completionSlice = createSlice({
   name: 'completion-data',
   initialState: {
      validCompletionData: getSessionStorageOrDefault('completion-data', {}),
      completionDataEntered: getSessionStorageOrDefault('completion-data-entered', false),
      tubingData: [],
      casingData: [],
      validSurveyData: getSessionStorageOrDefault('survey-data', createSurveyInitialRows()),
      surveyDataEntered: getSessionStorageOrDefault('survey-data-entered', false)
   },
   reducers: {
      replaceCompletionData(state, action) {
         state.validCompletionData = action.payload.validCompletionData;
         state.completionDataEntered = true
      },
      replaceSurveyData(state, action) {
         state.validSurveyData = action.payload.validSurveyData;
         state.surveyDataEntered = true
      },
      replaceTubingData(state, action) {
         state.tubingData = action.payload.tubingData;
      },
      replaceCasingData(state, action) {
         state.casingData = action.payload.casingData;
      }
   }
});

export const completionActions = completionSlice.actions;

export default completionSlice;
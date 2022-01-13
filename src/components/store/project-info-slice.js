import {createSlice} from "@reduxjs/toolkit";
import {getSessionStorageOrDefault} from "../service/SessionStorageService";

const projectInfoSlice = createSlice({
    name: 'project-info',
    initialState: {
        newProjectInfoData: getSessionStorageOrDefault("new-project-info-data", {}),
        newProjectDataEntered: getSessionStorageOrDefault("new-project-info-data-entered", false)
    },
    reducers: {
        replaceNewProjectData(state, action) {
            state.newProjectInfoData = action.payload.newProjectInfoData;
            state.newProjectDataEntered = true
        }
    }
});

export const projectInfoActions = projectInfoSlice.actions;

export default projectInfoSlice;
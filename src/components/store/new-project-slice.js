import {createSlice} from "@reduxjs/toolkit";

const newProjectSlice = createSlice({
    name: 'newProject',
    initialState: {
        newProjectData: [],
        newProjectDataInserted: false
    },
    reducers: {
        replaceNewProjectData(state, action) {
            state.newProjectData = action.payload.newProjectData;
            state.newProjectDataInserted = action.payload.newProjectDataInserted
        }
    }
});

export const hpdActions = newProjectSlice.actions;

export default newProjectSlice;
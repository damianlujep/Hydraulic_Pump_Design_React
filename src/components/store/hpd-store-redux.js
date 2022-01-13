import authSlice from "./auth-slice";
import projectInfoSlice from "./project-info-slice";
import completionSlice from "./completion-slice";

const {configureStore} = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        projectInfo: projectInfoSlice.reducer,
        completion: completionSlice.reducer
    }
});

export default store;
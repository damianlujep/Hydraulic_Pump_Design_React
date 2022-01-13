import {createSlice} from "@reduxjs/toolkit";
import {getSessionStorageOrDefault} from "../service/SessionStorageService";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        jwt: getSessionStorageOrDefault("jwt", ""),
        authorized: getSessionStorageOrDefault("authorized", false)
    },
    reducers: {
        authorizeLogin(state, action) {
            state.jwt = action.payload.jwt;
            state.authorized = true;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;
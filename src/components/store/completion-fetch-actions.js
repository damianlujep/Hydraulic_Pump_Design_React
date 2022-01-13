import {URI_ALL_CASING_LIST, URI_ALL_TUBING_LIST} from "../../api-constants";
import {completionActions} from "./completion-slice";

export const fetchTubingData = () => {
    return async (dispatch, getState) => {
        const authHeader = {'Authorization': getState().auth.jwt};
        const fetchData = async () => {
            const response = await fetch (URI_ALL_TUBING_LIST, {
                headers: authHeader
            });
            if (!response.ok) throw new Error('Could not fetch tubing data!');
            return await response.json();
        }

        try {
            const tubingData = await fetchData();
            dispatch(completionActions.replaceTubingData({
                tubingData
            }));
        } catch (e) {
            console.log(e);
        }
    }
};

export const fetchCasingData = () => {
    return async (dispatch, getState) => {
        const authHeader = {'Authorization': getState().auth.jwt};
        const fetchData = async () => {
            const response = await fetch (URI_ALL_CASING_LIST, {
                headers: authHeader
            });
            if (!response.ok) throw new Error('Could not fetch casing data!');
            return await response.json();
        }

        try {
            const casingData = await fetchData();
            dispatch(completionActions.replaceCasingData({
                casingData
            }));
        } catch (e) {
            console.log(e);
        }
    }
};
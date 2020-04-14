import {
	UPDATE_GLOBAL_SETTINGS

} from './actionTypes';

export const updateGlobalSettings = (settings) => {
	return { type: UPDATE_GLOBAL_SETTINGS, payload: settings };
};
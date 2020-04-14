import {
    UPDATE_GLOBAL_SETTINGS,
    PATIENT_LOOKUP,
    PATIENT_SEARCH,
    SCHEDULE_APPOINTMENT,
    GET_OPEN_SLOTS
} from '../actions/actionTypes';

export default function(state = defaultState, action) {
	switch (action.type) {
		case UPDATE_GLOBAL_SETTINGS:
			// console.log(`GlobalSettingsReducer received ${action.type}. action: `, action);
			return {
				...state,
				...action.payload
			};
        case PATIENT_SEARCH: 
        console.log("action payload", action.payload);
        return {
            ...state,
            ...action.payload,
        }
        case PATIENT_LOOKUP: 
        console.log("action payload", action.payload);
            return {
                ...state,
                ...action.payload,
            };
        case SCHEDULE_APPOINTMENT:
            console.log("action schedule", action.payload);
            return {
                ...state,
                ...action.payload,
            };
        case GET_OPEN_SLOTS:
            // console.log("slots", action.payload);
            return {
                ...state,
                ...action.payload,
            }
        default:
			return state;
	}
}

const defaultState = {
	loggedIn: false,
};

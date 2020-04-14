import GetOpenSlots from '../../EPICData/GetOpenSlots2019.json';

import {
    GET_OPEN_SLOTS,
} from './actionTypes';

export const getOpenSlots = (dummy) => async dispatch => {
    dispatch({type: GET_OPEN_SLOTS, payload: {openSlots: GetOpenSlots}})
}
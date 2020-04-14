import ScheduleAppointmentWithInsurance from '../../EPICData/ScheduleAppointmentWithInsurance2018B.json';

import {
    SCHEDULE_APPOINTMENT
} from './actionTypes';

export const scheduleAppointment = (patientID) => async dispatch => {
    console.log("schedule appt fired");
    if (!patientID){
        console.log("no pt id");
    } else {
        dispatch({type: SCHEDULE_APPOINTMENT, payload: ScheduleAppointmentWithInsurance})
    }
}
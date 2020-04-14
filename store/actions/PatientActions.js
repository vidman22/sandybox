import PatientInformation from '../../EPICData/PatientLookup3.json';
import PatientSearchInfo from '../../EPICData/PatientSearchR4.json';

import {
    PATIENT_LOOKUP,
    PATIENT_SEARCH
} from './actionTypes';

export const retrievePatientLookUpInfo = (patientId) => async dispatch =>{
    console.log("Epic patient id", patientId);
    if (!patientId){
        console.log("no pt id");
    } else {
        dispatch({type: PATIENT_LOOKUP, payload: PatientInformation});
    }
}

export const retrievePatientSearchInfo = (patientID) => async dispatch => {
    console.log("patient search fired", patientID);
    if (!patientID){
        console.log("no pt id");
    } else{
        dispatch({type: PATIENT_SEARCH, payload: PatientSearchInfo });
    }
}
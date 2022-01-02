import { toastErrorText } from '../../helpers/toastify';
import * as Types from '../constants/actionType';
import { API_ROUTE } from '../constants/constant';
import { callApiNoAuthen } from '../utils/apiCaller';
//#region  Login
export const GetAllLanguageAction = () => {
    return dispatch => {
        return callApiNoAuthen(`${API_ROUTE.URL_GET_LANGUAGE}`, 'GET').then(res => {
            let checkObject = typeof res === 'object';
            if (checkObject) {
                if (res.status === 200) {
                    let { data } = res;
                    if (data.statusCode == 200) {
                        dispatch({ type: Types.GET_LANGUAGE, data: data.value });
                    }
                    else {
                        toastErrorText(data.message);
                    }
                }
                else {
                    toastErrorText(res.data.message);
                }
            }
        });
    }
}

export const GetAllTechnologyAction = () => {
    return dispatch => {
        return callApiNoAuthen(`${API_ROUTE.URL_GET_TECHNOLOGY}`, 'GET').then(res => {
            let checkObject = typeof res === 'object';
            if (checkObject) {
                if (res.status === 200) {
                    let { data } = res;
                    if (data.statusCode == 200) {
                        dispatch({ type: Types.GET_TECHNOLOGY, data: data.value });
                    }
                    else {
                        toastErrorText(data.message);
                    }
                }
                else {
                    toastErrorText(res.data.message);
                }
            }
        });
    }
}

export const GetFreeTimeAction = () => {
    return dispatch => {
        return callApiNoAuthen(`${API_ROUTE.URL_GET_FREE_TIME}`, 'GET').then(res => {
            let checkObject = typeof res === 'object';
            if (checkObject) {
                if (res.status === 200) {
                    let { data } = res;
                    if (data.statusCode == 200) {
                        dispatch({ type: Types.GET_FREE_TIME, data: data.value });
                    }
                    else {
                        toastErrorText(data.message);
                    }
                }
                else {
                    toastErrorText(res.data.message);
                }
            }
        });
    }
}

export const GetJobAction = () => {
    return dispatch => {
        return callApiNoAuthen(`${API_ROUTE.URL_GET_JOB}`, 'GET').then(res => {
            let checkObject = typeof res === 'object';
            if (checkObject) {
                if (res.status === 200) {
                    let { data } = res;
                    if (data.statusCode == 200) {
                        dispatch({ type: Types.GET_JOB, data: data.value });
                    }
                    else {
                        toastErrorText(data.message);
                    }
                }
                else {
                    toastErrorText(res.data.message);
                }
            }
        });
    }
}
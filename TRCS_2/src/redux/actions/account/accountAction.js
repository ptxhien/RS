import * as Types from './../../constants/actionType';
import { callApi, callApiLogin } from './../../utils/apiCaller';
import { history } from '../../../helpers/history';
import { toastErrorText, toastSuccess, toastSuccessText } from '../../../helpers/toastify';
import { API_ROUTE } from '../../constants/constant';
import queryString from 'query-string';
//#region  Login
export const actionLoginRequest = (args) => {
    return dispatch => {
        return callApi(`${API_ROUTE.URL_LOGIN}`, 'POST', args).then(res => {
            let checkObject = typeof res === 'object';
            if (checkObject) {
                if (res.status === 200) {
                    let { data } = res;
                    if (data.statusCode == 200) {
                        console.log(data.value)
                        dispatch(actionLogin(data.value));
                        history.push('/#/Dashboard/crm');
                        window.location.reload(true);
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
export const actionLogin = (arg) => {
    let account = {
        token: arg.Token,
        userid: arg.UserId,
        email: arg.Email,
        name: arg.Name,
    };
    return {
        type: Types.LOGIN,
        account
    }
}
//#endregion


export const registerAction = (args) => {
    return dispatch => {
        return callApi(`${API_ROUTE.URL_REGISTER}`, 'POST', args).then(res => {
            let checkObject = typeof res === 'object';
            if (checkObject) {
                if (res.status === 200) {
                    let { data } = res;
                    if (data.statusCode == 200) {
                        toastSuccessText("Success")
                        history.push('/#/login');
                        window.location.reload(true);
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
import { stringify } from 'query-string';
import * as Types from '../../constants/actionType';

var initialState = [];

const account = (state = initialState, action) => {
    var { account } = action;
    switch (action.type) {
        case Types.LOGIN:
            localStorage.setItem("token", account.token);
            localStorage.setItem("userid", account.userid);
            localStorage.setItem("email", account.email);
            localStorage.setItem("name", account.name);
            state.push(account);
            return [...state];
        default: return [...state];
    }
};

export default account;
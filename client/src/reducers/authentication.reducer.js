import {AuthenticationConstants} from '../constants/authentication.constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {user} : {};

export function authenticationReducer(state = initialState, action) {
    const {type, user, accessToken} = action;

    switch (type) {
        case AuthenticationConstants.LOGIN_SUCCESS:
            return {user};
        case AuthenticationConstants.OTP_SUCCESS:
            return {
                user: {...state.user, accessToken}
            };
        case AuthenticationConstants.LOGOUT:
            return {};
        default:
            return state
    }
}

export default authenticationReducer;

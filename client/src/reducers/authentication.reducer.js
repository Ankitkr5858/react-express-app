import {AuthenticationConstants} from '../constants/authentication.constants';
import {UserConstants} from '../constants/user.constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {user} : {};

export function authenticationReducer(state = initialState, action) {
    const {type, user, accessToken, invitedByReferralCode} = action;

    switch (type) {
        case AuthenticationConstants.LOGIN_SUCCESS:
            return {user};
        case AuthenticationConstants.OTP_SUCCESS:
            return {user: {...state.user, accessToken}};
        case AuthenticationConstants.LOGOUT:
            return {};
        case UserConstants.REFERRAL_CODE_PERSISTED:
            return {...state, invitedByReferralCode};
        case UserConstants.PROFILE_UPDATE_SUCCESS:
            return {user: {...state.user, ...user}};
        default:
            return state
    }
}

export default authenticationReducer;

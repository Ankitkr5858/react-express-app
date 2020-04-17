import {AuthenticationConstants} from '../constants/authentication.constants';
import {UserConstants} from '../constants/user.constants';


export function referralCodeReducer(state = {}, action) {
    const {invitedByReferralCode} = action;

    switch (action.type) {
        case UserConstants.REFERRAL_CODE_PERSISTED:
            return {invitedByReferralCode};
        case AuthenticationConstants.OTP_SUCCESS:
            return {};
        default:
            return state
    }
}

export default referralCodeReducer;

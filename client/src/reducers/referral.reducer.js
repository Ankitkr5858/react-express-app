import {UserConstants} from '../constants/user.constants';


export function referralCodeReducer(state = {}, action) {
    const {invitedByReferralCode} = action;

    switch (action.type) {
        case UserConstants.REFERRAL_CODE_PERSISTED:
            return {invitedByReferralCode};
        case UserConstants.PROFILE_UPDATE_SUCCESS:
            return {};
        default:
            return state
    }
}

export default referralCodeReducer;

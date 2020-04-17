import {combineReducers} from 'redux';

import {authenticationReducer} from './authentication.reducer';
import {errorReducer} from './error.reducer';
import {referralCodeReducer} from "./referral.reducer";

const rootReducer = combineReducers({
    authenticationReducer,
    errorReducer,
    referralCodeReducer
});

export default rootReducer;

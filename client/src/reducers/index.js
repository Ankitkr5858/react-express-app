import {combineReducers} from 'redux';

import {authenticationReducer} from './authentication.reducer';
import {errorReducer} from './error.reducer';

const rootReducer = combineReducers({
    authenticationReducer,
    errorReducer
});

export default rootReducer;

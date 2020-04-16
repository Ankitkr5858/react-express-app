import {ErrorConstants} from '../constants/error.constants';

const initialState = {
    error: null
};

export function errorReducer(state = initialState, action) {
    const {error, type} = action;

    if (type === ErrorConstants.DISPLAY_ERROR) {
        return {error};
    } else if (type === ErrorConstants.DELETE_ERROR){
        return {};
    }

    return state;
}

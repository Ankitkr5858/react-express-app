import {ErrorConstants} from '../constants/error.constants';

export function displayError(error) {
    return {
        type: ErrorConstants.DISPLAY_ERROR,
        error: error
    }
}

export function deleteError() {
    return {type: ErrorConstants.DELETE_ERROR}
}

export const errorActions = {
    displayError,
    deleteError
};

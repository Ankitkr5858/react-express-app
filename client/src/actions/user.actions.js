import {AuthenticationConstants} from '../constants/authentication.constants';
import {UserConstants} from '../constants/user.constants';
import {userService} from '../services/user.service';
import {deleteError, displayError} from './error.actions';
import {history} from '../history';

function login(email) {
    return dispatch => {
        userService.login(email)
            .then(
                user => {
                    dispatch({type: AuthenticationConstants.LOGIN_SUCCESS, user});
                    deleteError();
                    history.push('/otp');
                },
                error => {
                    dispatch({type: AuthenticationConstants.LOGIN_FAILURE, error});
                    dispatch(displayError(error.error || 'Something went wrong'));
                }
            );
    };
}

function loginWithOTP(otp) {
    return dispatch => {
        userService.loginWithOTP(otp)
            .then(
                user => {
                    dispatch({type: AuthenticationConstants.OTP_SUCCESS, accessToken: user.accessToken});
                    deleteError();
                    const a = userService.userData().isProfileComplete
                    debugger
                    if (a) {
                        history.push('/profile');
                    } else {
                        history.push('/profile/edit');
                    }
                },
                error => {
                    dispatch({type: AuthenticationConstants.OTP_FAILURE, error});
                    dispatch(displayError(error.error || 'Something went wrong'));
                }
            );
    };
}

function updateProfile(user) {
    return dispatch => {
        userService.update(user)
            .then(
                user => {
                    dispatch({type: UserConstants.PROFILE_UPDATE_SUCCESS, user});
                    deleteError();
                    history.push('/profile');
                },
                error => {
                    dispatch({type: UserConstants.PROFILE_UPDATE_FAILURE, error});
                    dispatch(displayError(error.error || 'Something went wrong'));
                }
            );
    };
}


function logout() {
    userService.logout();
    return {type: AuthenticationConstants.LOGOUT};
}

function logoutAndRedirect() {
    history.push('/login');
    return {type: AuthenticationConstants.LOGOUT};
}

export const userActions = {
    login,
    logout,
    logoutAndRedirect,
    loginWithOTP,
    updateProfile
};
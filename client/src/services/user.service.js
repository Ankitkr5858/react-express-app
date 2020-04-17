import api from './api';

function userData() {
    return JSON.parse(localStorage.getItem('user'));
}

function login(email) {
    return api.post('login', {email}).then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function loginWithOTP(email, otp) {
    return api.post('otp', {email, otp}).then(user => {
        user = {...userData(), ...user};
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function update(data) {
    return api.patch('user/profile', data).then(user => {
        user = {...userData(), ...user};
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function logout() {
    localStorage.removeItem('user');
}

export const userService = {
    login,
    loginWithOTP,
    logout,
    update,
    userData
};

/* global localStorage:false */
import AuthService from '../../services/Auth';
import history from '../../history';

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGOUT,
} from './types';

export function authStart() {
    return {
        type: AUTH_START
    };
}

export function authSuccess(email, token) {
    return {
        type: AUTH_SUCCESS,
        email,
        token,
    };
}

export function authError() {
    return {
        type: AUTH_ERROR
    };
}

export function loginStart() {
    return {
        type: LOGIN_START,
    };
}

export function loginSuccess(email, token) {
    return {
        type: LOGIN_SUCCESS,
        email,
        token,
    };
}

export function loginError() {
    return {
        type: LOGIN_ERROR,
    };
}

export function logout() {
    if (localStorage) {
        localStorage.removeItem('token');
    }
    history.push('/');
    return {
        type: LOGOUT
    };
}

export function signupStart() {
    return {
        type: SIGNUP_START
    };
}

export function signupSuccess(email, token) {
    return {
        type: SIGNUP_SUCCESS,
        email,
        token,
    };
}

export function signupError() {
    return {
        type: SIGNUP_ERROR
    };
}

export function login(email, password) {
    return function (dispatch) {
        dispatch(loginStart());
        return AuthService.login(email, password)
        .then((result) => {
            if (result.status === 200 && result.data.token) {
                if (localStorage) {
                    localStorage.setItem('token', result.data.token);
                }
                dispatch(loginSuccess(email, result.data.token));
                history.push('/protected');
            } else {
                dispatch(loginError());
            }
            return result;
        });
    };
}

export function signup(email, password) {
    return function (dispatch) {
        dispatch(signupStart());
        return AuthService.signup(email, password)
        .then((result) => {
            if (result.status === 200 && result.data.token) {
                if (localStorage) {
                    localStorage.setItem('token', result.data.token);
                }
                dispatch(signupSuccess(email, result.data.token));
                history.push('/protected');
            } else {
                dispatch(signupError());
            }
            return result;
        });
    };
}

export function auth(token) {
    return function (dispatch) {
        dispatch(authStart());
        return AuthService.getUserData(token)
        .then(res => {
            if (res.status === 200 && res.data.token) {
                dispatch(authSuccess(res.data.user.email, res.data.token));
            } else {
                dispatch(authError());
                if (localStorage) {
                    localStorage.removeItem('token');
                }
                dispatch(logout());
            }
        });
    };
}

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
} from '../actions/types';

const initialState = {
    email: null,
    token: null,
    loggingIn: false,
    loggedIn: false,
};

function userReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_START:
        case AUTH_START:
        case SIGNUP_START:
            return {
                email: null,
                token: null,
                loggingIn: true,
                loggedIn: false,
            };
        case LOGIN_SUCCESS:
        case AUTH_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                email: action.email,
                token: action.token,
                loggingIn: false,
                loggedIn: true,
            };
        case LOGIN_ERROR:
        case AUTH_ERROR:
        case SIGNUP_ERROR:
        case LOGOUT:
            return {
                email: null,
                token: null,
                loggingIn: false,
                loggedIn: false,
            };
        default:
            return state;
    }
}

export default userReducer;

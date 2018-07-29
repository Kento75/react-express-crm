/* global localStorage:false */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import userReducer from './store/reducers/user.reducer';
import { auth } from './store/actions/user.actions';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
    // add loggerMiddleware in development, which will log all actions to the web console
    const loggerMiddleware = createLogger({
        predicate: (getState, action) => !action.type.includes('@@redux-form'), // don't log redux-form actions
    });
    middlewares.push(loggerMiddleware);
}

const rootReducer = combineReducers({
    user: userReducer,
    form: formReducer
});
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

// after the store is initialized, attempt to auth the user
if (localStorage && localStorage.getItem('token') !== null) {
    store.dispatch(auth(localStorage.getItem('token')));
}

export default store;

const   chai = require('chai'),
        expect = require('chai').expect,
        chaiHttp = require('chai-http');

import userReducer from '../../../client/src/store/reducers/user.reducer';
import * as types from '../../../client/src/store/actions/types';

chai.use(chaiHttp);

describe('User Reducer',  function() {
    
    it('should return the initial state', () => {
        const actual = userReducer(undefined, {});
        const expected = {
            email: null,
            token: null,
            loggingIn: false,
            loggedIn: false,
        };
        expect(actual).to.deep.equal(expected);
    });
    
    it('should handle AUTH_START', () => {
        const actual = userReducer(undefined, {
            type: types.AUTH_START,
        });
        const expected = {
            email: null,
            token: null,
            loggingIn: true,
            loggedIn: false,
        };
        expect(actual).to.deep.equal(expected);
    });
    
    it('should handle AUTH_SUCCESS', () => {
        const actual = userReducer(undefined, {
            type: types.AUTH_SUCCESS,
            email: 'test@test.com',
            token: 'abcd1234',
        });
        const expected = {
            email: 'test@test.com',
            token: 'abcd1234',
            loggingIn: false,
            loggedIn: true,
        };
        expect(actual).to.deep.equal(expected);
    });

    it('should handle AUTH_ERROR', () => {
        const actual = userReducer(undefined, {
            type: types.AUTH_ERROR,
        });
        const expected = {
            email: null,
            token: null,
            loggingIn: false,
            loggedIn: false,
        };
        expect(actual).to.deep.equal(expected);
    });

});

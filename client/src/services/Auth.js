/* global fetch:false */
import 'whatwg-fetch';

const fetchFromApi = (url, opts) => {
    return new Promise((resolve, reject) => {
        fetch(url, opts)
        .then(res => res.json())
        .then((result) => {
            resolve(result);
        });
    });
}
export default class AuthService {
    
    static getUserData(token) {
        return fetchFromApi(
            "/api/me", {
                headers: {
                    'authorization': 'bearer '+token,
                    'content-type': 'application/json',
                },
                method: 'GET',
            });
    }
    
    static login(email, password) {
        return fetchFromApi(
            "/auth/login", {
                body: JSON.stringify({email, password}),
                headers: {
                    'content-type': 'application/json',
                },
                method: 'POST',
            });
    }
    
    static signup(email, password) {
        return fetchFromApi(
            "/auth/signup", {
                body: JSON.stringify({email, password}),
                headers: {
                    'content-type': 'application/json',
                },
                method: 'POST',
            });
    }
}

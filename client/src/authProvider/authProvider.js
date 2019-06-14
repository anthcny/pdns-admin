import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import axios from 'axios';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        let success = false;
        console.log('LOGIN TRY', username, password);
        // fetch('/api/test/ok').then(r => r.text()).then(r => console.log('login '+r));
        return axios.post('/api/sign/in', {
            username,
            password,
        })
        .then(res => {
            const { data: { token } } = res;
            localStorage.setItem('username', username);
            localStorage.setItem('token', token);
            return console.log('LOGIN SUCCESS!');
        })
        .catch(e => console.log('Login failed', e));
        // localStorage.setItem('username', username);
        // return Promise.resolve();
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
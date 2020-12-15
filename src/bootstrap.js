// lodash
window._ = require('lodash');

import AppLocalStorage from './services/localStorage/localStorage';
import swal from 'sweetalert2';

window.NProgress = require('nprogress');
window.axios = require('axios');

window.axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'Bearer ' + AppLocalStorage.get('token');
    return config;
});

window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401 && window.location.pathname !== '/login') {
        swal({
            type: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: 'Oops...',
            text: 'Your session has been terminated!'
        }).then((result) => {
            AppLocalStorage.clear();
            app.$router.push('/login');
            return Promise.reject(error);
        });
    } else {
        if (error.response.status === 401) {
            AppLocalStorage.clear();
            app.$router.push('/login');
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
});

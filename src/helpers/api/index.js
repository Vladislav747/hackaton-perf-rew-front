import { stringify } from 'query-string';
import merge from 'lodash/merge';

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const DEFAULT_FETCH_TIMEOUT = 40000;

export const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(`${response.status} ${response.statusText}`);
    error.response = response;
    throw error;
};

export const parseJSON = response => response.json();

export const parseSettings = ({
    method = 'get',
    data,
    ...otherSettings
} = {}) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    const settings = merge(
        {
            body: data ? JSON.stringify(data) : undefined,
            method,
            headers
        },
        otherSettings
    );
    return settings;
};

export const parseEndpoint = (endpoint, params) => {
    const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
    const querystring = params ? `?${stringify(params)}` : '';
    return `${url}${querystring}`;
};

const api = {};

api.request = (endpoint, { params, ...settings } = {}) =>
    fetch(parseEndpoint(endpoint, params), parseSettings(settings))
        .then(checkStatus)
        .then(parseJSON);

api.get = (endpoint, settings) =>
    api.request(endpoint, { method: 'get', ...settings });

api.post = (endpoint, data, settings) =>
    api.request(endpoint, { method: 'post', data, ...settings });

api.create = (settings = {}) => ({
    settings,

    setToken(token) {
        this.settings.headers = {
            ...this.settings.headers,
            Authorization: `Bearer ${token}`
        };
    },

    unsetToken() {
        this.settings.headers = {
            ...this.settings.headers,
            Authorization: undefined
        };
    },

    request(endpoint, settings) {
        return api.request(endpoint, merge({}, this.settings, settings));
    },

    post(endpoint, data, settings) {
        return this.request(endpoint, { method: 'post', data, ...settings });
    },

    get(endpoint, settings) {
        return this.request(endpoint, { method: 'get', ...settings });
    },

    delete(endpoint, settings) {
        return this.request(endpoint, { method: 'delete', ...settings });
    },

    put(endpoint, data, settings) {
        return this.request(endpoint, { method: 'put', data, ...settings });
    }
});

export default api;

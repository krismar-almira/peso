import axios from "axios";

const defaultOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}` 
    },
};
export const api = axios.create(defaultOptions);

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AccessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

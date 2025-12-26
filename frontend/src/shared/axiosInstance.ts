import axios from "axios";
import { getSavedToken } from "../utils/storage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getSavedToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("API Request:", config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.log("Request Error:", error);
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("API Response:", response.status, response.config.url);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Access token expired");

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("Refresh token failed");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

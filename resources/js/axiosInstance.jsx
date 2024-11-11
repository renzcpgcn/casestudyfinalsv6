// resources/js/api/axiosInstance.jsx
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Adjust to your Laravel backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
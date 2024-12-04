import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});


export default axiosInstance;

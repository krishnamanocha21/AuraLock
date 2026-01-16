import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // Your Backend Base URL
    withCredentials: true, // ⚠️ IMPORTANT: Sends the HTTP-Only Cookies automatically
});

export default api;
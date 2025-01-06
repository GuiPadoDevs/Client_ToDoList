import axios from 'axios';

const api = axios.create({
    baseURL: 'http://server-to-do-list.vercel.app/api',
});

export default api;

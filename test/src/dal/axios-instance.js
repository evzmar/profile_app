import * as axiosLib from "axios";

const axios = axiosLib.create({
    baseURL: 'http://localhost:3001',
    withCredentials: false
});


export  default axios;

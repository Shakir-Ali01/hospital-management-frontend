import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInnstance = axios.create({
  baseURL: 'http://localhost:9000'
    // headers: {
    //     'Content-Type': 'application/json',
    // },  
});
// An interceptor is like middleware:
// It runs before the request is sent.
// We can modify the request (e.g., add authentication token, custom headers).

axiosInnstance.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    console.log('Request made with ', config);
    // You can add any request interceptors here
    return config;
});
export default axiosInnstance;
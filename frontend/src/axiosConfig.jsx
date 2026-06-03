import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://3.106.244.19:5001', // local
  //baseURL: 'http://3.26.96.188:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;

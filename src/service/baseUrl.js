import axios from 'axios';
var axiosInstance = axios.create({
  baseURL: 'http://192.168.1.28:3000/api/v1',
  /* other custom settings */
});

module.exports = axiosInstance;

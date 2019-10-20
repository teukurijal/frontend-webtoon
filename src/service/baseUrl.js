import axios from 'axios';
var axiosInstance = axios.create({
  baseURL: 'http://192.168.100.5:3000/api/v1',
  /* other custom settings */
});

module.exports = axiosInstance;
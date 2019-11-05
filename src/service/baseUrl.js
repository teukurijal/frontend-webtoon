import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.131:3000/api/v1',
});

module.exports = axiosInstance;

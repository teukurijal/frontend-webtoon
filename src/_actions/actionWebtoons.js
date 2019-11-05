// import axios from 'axios'
import axiosInstance from '../service/baseUrl';
// import axios from 'axios';

export const getWebtoons = () => ({
    type: 'GET_WEBTOONS',
    payload:  axiosInstance({
      method:'GET',
      url:'/webtoons'
    })
  });
import axiosInstance from '../service/baseUrl';

export const getFavorites = () => ({
    type: 'GET_FAVORITES',
    payload:  axiosInstance({
      method:'GET',
      url:'/webtoons?is_favorite=true'})
  });
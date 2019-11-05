// import axios from 'axios'
import axiosInstance from '../service/baseUrl';

export const getEpisodes = (user_id, toonid, token) => ({
    type: 'GET_EPISODES',
    payload:  axiosInstance({
      method:'GET',
      url:`/user/${user_id}/webtoon/${toonid}/episodes`,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
  });
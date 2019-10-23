import axios from 'axios'

export function fetchWebtoons() {
  return {
    type: 'FETCH_WEBTOONS',
    payload: axios.get('http://54.251.190.81:3000/api/v1/webtoons')
  }
}
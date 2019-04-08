import axios from "axios";
import { HOST } from 'common/js/config'

export function getBannerList() {
  return axios.get(`${HOST}/banner`).then(res => {
    return res.data;
  });
}

export function getSongList() {
  return axios.get(`${HOST}/personalized`);
}

export function getNewSong() {
  return axios.get(`${HOST}/personalized/newsong`);
}

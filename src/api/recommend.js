import axios from "axios";

export function getBannerList() {
  return axios.get("http://localhost:3000/banner").then(res => {
    return res.data;
  });
}

export function getSongList() {
  return axios.get("http://localhost:3000/personalized");
}

export function getNewSong() {
  return axios.get("http://localhost:3000/personalized/newsong");
}

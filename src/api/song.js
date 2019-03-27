import axios from "axios";
import { HOST, ERR_OK } from "common/js/config";

export function getSongUrl(songId) {
  return axios.get(`${HOST}/song/url?id=${songId}`).then(res => {
    if (res.data.code === 200) {
      return res.data.data[0].url;
    }
  });
}

export function getSongDetail(id) {
  return axios.get(`${HOST}/playlist/detail?id=${id}`).then(res => {
    if (res.data.code === ERR_OK) {
      return res.data.playlist.tracks;
    }
  });
}

export function getLyric(id) {
  const url = HOST + `/lyric?id=${id}`;
  return axios.get(url);
}

export function getAlbum(id) {
  return axios.get(`${HOST}/album?id=${id}`);
}

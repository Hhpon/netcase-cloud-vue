import axios from 'axios'
import { HOST } from 'common/js/config'

export function getSongUrl(songId) {
  return axios.get(`${HOST}/song/url?id=${songId}`).then(res => {
    if (res.data.code === 200) {
      return res.data.data[0].url
    }
  })
}

export function getLyric(id) {
  const url = HOST + `/lyric?id=${id}`

  return axios.get(url)
}
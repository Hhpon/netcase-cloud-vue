import axios from 'axios'
import { HOST } from 'common/js/config'

export function getHotKey() {
  return axios.get(`${HOST}/search/hot`)
}

export function search(query, offset) {
  return axios.get(`${HOST}/search?keywords=${query}&&offset=${offset}`)
}
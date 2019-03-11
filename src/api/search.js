import axios from 'axios'
import { HOST } from 'common/js/config'

export function getHotKey() {
  return axios.get(`${HOST}/search/hot`)
}
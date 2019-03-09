import axios from 'axios'
import { HOST, ERR_OK } from 'common/js/config'

export function getTopList(i) {
  return new Promise((resolve, reject) => {
    axios.get(`${HOST}/top/list?idx=${i}`).then(res => {
      if (res.data.code === ERR_OK) {
        resolve(res.data.playlist)
      } else {
        reject('排行获取失败')
      }
    })
  })
}
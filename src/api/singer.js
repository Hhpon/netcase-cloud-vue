import axios from 'axios'
import pinyin from 'pinyin'
import { HOST } from 'common/js/config'

export function getSinger() {
    return axios
        .get(`${HOST}/top/artists?offset=0&limit=100`)
        .then(res => {
            let result = res.data.artists
            result.forEach(element => {
                element.py = pinyin(element.name[0], {
                    style: pinyin.STYLE_FIRST_LETTER
                })[0][0].toUpperCase()
            });
            return result
        });
}

export function getSingerDetail(id) {
    return axios.get(`${HOST}/artists?id=${id}`).then((result) => {
        console.log(result.data);
        return result.data;
    }).catch((err) => {
        return (`getSingerDetail的错误是${err}`)
    });
}
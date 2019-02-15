import axios from 'axios'
import pinyin from 'pinyin'

export function getSinger() {
    return axios
        .get("http://localhost:3000/top/artists?offset=0&limit=100")
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
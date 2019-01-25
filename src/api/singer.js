import axios from 'axios'

export function getSinger() {
    return axios
        .get("http://localhost:3000/top/artists?offset=0&limit=100")
        .then(res => {
            return res.data.artists
        });
}
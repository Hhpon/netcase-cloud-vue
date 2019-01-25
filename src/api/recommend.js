import axios from 'axios'

export function getBannerList() {
    return axios.get("http://localhost:3000/banner").then(res => {
        return res.data
    });
}
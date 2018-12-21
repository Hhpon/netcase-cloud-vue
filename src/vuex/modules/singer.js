import axios from 'axios';
import pinyin from "pinyin";
export default {
    state: {
        singerList: []
    },
    mutations: {
        getSingerM(state,artists_arr){
            console.log(artists_arr);
        }
    },
    actions:{
        getSinger({commit}){
            axios
            .get("http://localhost:3000/top/artists?offset=0&limit=100")
            .then(res => {
              let artists = res.data.artists;
              console.log(artists);
              let artists_arr = [];
              artists.forEach(element => {
                artists_arr.push(element.name);
              });
              artists_arr.sort(pinyin.compare);
              commit('getSingerM',artists_arr)
            });
        }
    }
}
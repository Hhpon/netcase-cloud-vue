import axios from 'axios';
import pinyin from "pinyin";
export default {
    state: {
        singerList: []
    },
    mutations: {
        getSingerM(state, artists_arr) {
        }
    },
    actions: {
        getSinger({ commit }) {
            axios
                .get("http://localhost:3000/top/artists?offset=0&limit=100")
                .then(res => {
                    let artists = res.data.artists;
                    console.log(artists);
                    let artists_arr = [];
                    artists.forEach(element => {
                        // artists_arr.push(element.name);
                        let pin = pinyin(element.name)
                        // console.log(pin);
                    });
                    //   artists_arr.sort(pinyin.compare);

                    const data = '我要排序'.split('');
                    const pinyinData = data.map(han => ({
                        han: han,
                        pinyin: pinyin(han)[0][0], // 可以自行选择不同的生成拼音方案和风格。
                    }));
                    const sortedData = pinyinData.sort((a, b) => {
                        return a.pinyin.localeCompare(b.pinyin);
                    }).map(d => d.han);
                    console.log(sortedData);

                    commit('getSingerM', artists_arr)
                });
        }
    }
}
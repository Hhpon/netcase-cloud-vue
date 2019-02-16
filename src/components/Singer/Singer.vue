<template>
  <div>
    <list-view :data="singers"></list-view>
  </div>
</template>
<script>
import { getSinger } from "api/singer";
import Singer from "common/js/singer";
import ListView from "base/listview/listview";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
  data() {
    return {
      singers: []
    };
  },
  components: {
    ListView
  },
  created() {
    this._getSinger();
  },
  methods: {
    _getSinger() {
      getSinger()
        .then(res => {
          this.singers = this._normalizeSinger(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          name: HOT_NAME,
          items: []
        }
      };
      list.forEach((element, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: element.id,
              name: element.name,
              img1v1Url: element.img1v1Url
            })
          );
        }
        let key = element.py;
        if (!map[key]) {
          map[key] = {
            name: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: element.id,
            name: element.name,
            img1v1Url: element.img1v1Url
          })
        );
      });

      // 为了得到有序列表，我们需要处理map
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.name.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.name === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  }
};
</script>


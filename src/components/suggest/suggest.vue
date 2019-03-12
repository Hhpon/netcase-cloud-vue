<template>
  <div class="suggest">
    <ul class="suggest-songs-list">
      <li class="suggest-songs-item" v-for="(item,index) in result" :key="index">
        <div class="name">{{item.songName}}</div>
        <div class="singer">{{item.singer}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from "api/search";
import { ERR_OK } from "common/js/config";
import { createSearchSong } from "common/js/song";

export default {
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      offset: 0,
      result: []
    };
  },
  methods: {
    search() {
      search(this.query, this.offset).then(res => {
        if (res.data.code === ERR_OK) {
          this.result = this.result.concat(
            this._normalizeSongs(res.data.result.songs)
          );
          console.log(this.result);
        }
      });
    },
    _normalizeSongs(list) {
      console.log(list);
      let ret = [];
      list.forEach(item => {
        if (item.id && item.album.id) {
          ret.push(createSearchSong(item));
        }
      });
      return ret;
    }
  },
  watch: {
    query() {
      this.search();
    }
  }
};
</script>


<style lang="scss" scoped>
@import "common/scss/variable.scss";
@import "common/scss/mixin.scss";

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>


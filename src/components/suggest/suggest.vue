<template>
  <cube-scroll
    ref="suggest"
    :data="result"
    :options="options"
    @pulling-up="onPullingUp"
    :scrollEvents="scrollEvents"
    class="suggest"
    @before-scroll-start="beforeScroll"
  >
    <div class="bestMatch" v-show="result.length||searchSuggest.length">最佳匹配</div>
    <ul class="suggest-list">
      <li
        @click="selectSuggset(item)"
        class="suggest-list-item"
        v-for="(item,index) in searchSuggest"
        :key="index"
      >
        <img :src="item.img1v1Url || item.coverImgUrl" class="suggest-item-img">
        <div class="suggest-item-mes">
          <span>{{suggestTitle(item)}}</span>
          <span>{{item.name}}</span>
        </div>
      </li>
    </ul>
    <ul class="suggest-songs-list">
      <li
        @click="selectItem(item)"
        class="suggest-songs-item"
        v-for="(item,index) in result"
        :key="index"
      >
        <div class="name">{{item.songName}}</div>
        <div class="singer">{{item.singer}}</div>
      </li>
    </ul>
    <div
      class="no-result-wrapper"
      v-show="!result.length&&!hasMore&&!searchSuggest.length"
    >抱歉，暂无搜索结果</div>
  </cube-scroll>
</template>

<script>
import { search, searchSuggest } from "api/search";
import { getAlbum } from "api/song";
import { ERR_OK } from "common/js/config";
import { createSearchSong } from "common/js/song";
import Singer from "common/js/singer";
import { mapMutations, mapActions } from "vuex";

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
      result: [],
      options: {
        pullUpLoad: true
      },
      hasMore: true,
      searchSuggest: [],
      scrollEvents: ["before-scroll-start"]
    };
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER",
      setDisc: "SET_DISC"
    }),
    ...mapActions(["insertSong"]),
    selectItem(item) {
      getAlbum(item.alId).then(res => {
        item.alPicUrl = res.data.album.picUrl;
        this.insertSong(item);
      });
      this.$emit("saveSearch");
    },
    beforeScroll() {
      this.$emit("scrollList");
    },
    selectSuggset(item) {
      if ("img1v1Url" in item) {
        const singer = new Singer({
          id: item.id,
          name: item.name,
          img1v1Url: item.img1v1Url
        });
        this.$router.push({ path: `/search/singer/${singer.id}` });
        this.setSinger(singer);
      } else {
        this.$router.push({
          path: `/search/disc/${item.id}`
        });
        this.setDisc(item);
      }
      this.$emit("saveSearch"); // 当我们点击搜索结果的时候我们把搜索的关键词保存在本地存储中
    },
    suggestTitle(item) {
      if ("img1v1Url" in item) {
        return "歌手：";
      }
      return "歌单：";
    },
    onPullingUp() {
      if (!this.hasMore) {
        this.$refs.suggest.forceUpdate();
        return;
      }
      this.searchMore();
    },
    searchMore() {
      this.offset++;
      search(this.query, this.offset).then(res => {
        console.log(res.data);
        console.log(this.offset);
        if (res.data.code === ERR_OK) {
          this.result = this.result.concat(
            this._normalizeSongs(res.data.result.songs)
          );
          this._checkMore(res.data.result);
        }
      });
    },
    _search() {
      this.hasMore = true;
      this.offset = 0;
      this.$refs.suggest.scrollTo(0, 0);
      if (this.query) {
        search(this.query, this.offset).then(res => {
          if (res.data.code === ERR_OK) {
            this.result = this._normalizeSongs(res.data.result.songs);
            this._checkMore(res.data.result);
          }
        });
        this._searchSuggest();
      }
    },
    _searchSuggest() {
      this.searchSuggest = [];
      searchSuggest(this.query).then(res => {
        if (res.data.code === ERR_OK) {
          let result = res.data.result;
          if ("artists" in result) {
            this.searchSuggest.push(result.artists[0]);
          }
          if ("playlists" in result) {
            this.searchSuggest.push(result.playlists[0]);
          }
        }
      });
    },
    _checkMore(data) {
      if (!data.songs || (this.offset + 1) * 30 >= data.songCount) {
        this.hasMore = false;
      }
    },
    _normalizeSongs(list) {
      console.log(list);
      let ret = [];
      if (!list) {
        return ret;
      }
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
      this._search();
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
  .bestMatch {
    padding: 0 20px;
    line-height: 30px;
    font-size: $font-size-small;
    color: $color-text-theme;
  }
  .suggest-list {
    .suggest-list-item {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 20px;
      border-bottom: 1px solid $color-border;
      .suggest-item-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .suggest-item-mes {
        line-height: 50px;
        font-size: $font-size-medium;
      }
    }
  }
  .suggest-songs-list {
    .suggest-songs-item {
      padding: 20px 0 10px 20px;
      border-bottom: 1px solid $color-border;
      .name {
        @include no-row;
      }
      .singer {
        padding-top: 5px;
        color: $color-light;
        font-size: $font-size-small;
        @include no-row;
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 40%;
    text-align: center;
  }
}
</style>


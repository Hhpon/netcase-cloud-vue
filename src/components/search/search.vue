<template>
  <transition name="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="query"></search-box>
      <div ref="shortcut-wrapper" class="shortcut-wrapper" v-show="!newQuery">
        <cube-scroll ref="scroll" :data="hotKey">
          <div class="shortcut">
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li
                  @click="addQuery(item.first)"
                  class="item"
                  v-for="(item,index) in hotKey"
                  :key="index"
                >
                  <span>{{item.first}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history">
              <div class="search-title">
                <h1 class="title">搜索历史</h1>
                <svg @click="clearSearchHistory" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-laji"></use>
                </svg>
              </div>
              <div class="search-list">
                <search-list
                  @select="addQuery"
                  @deleteOne="deleteSearchHistory"
                  :searchHistory="searchHistory"
                ></search-list>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
      <div class="suggest-scroll" v-show="newQuery">
        <suggest @saveSearch="saveSearch" @scrollList="scrollList" ref="suggest" :query="newQuery"></suggest>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import SearchBox from "base/search-box/search-box";
import SearchList from "base/search-list/search-list";
import { playlistMixin } from "common/js/mixin";
import { getHotKey } from "api/search";
import { ERR_OK } from "common/js/config";
import Suggest from "components/suggest/suggest";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [playlistMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList
  },
  data() {
    return {
      hotKey: [],
      newQuery: ""
    };
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  created() {
    this._getHotKey();
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : 0;
      this.$refs["shortcut-wrapper"].style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    saveSearch() {
      this.saveSearchHistory(this.newQuery);
    },
    query(newQuery) {
      this.newQuery = newQuery;
    },
    scrollList() {
      this.$refs.searchBox.blur();
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.data.code === ERR_OK) {
          this.hotKey = res.data.result.hots;
        }
      });
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    ...mapActions([
      "saveSearchHistory",
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.search-enter-active,
.search-leave-active {
  transition: all 0.3s;
}
.search-enter,
.search-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.search-box-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .shortcut-wrapper {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px;
        .title {
          line-height: 20px;
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-light;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          font-size: $font-size-medium;
          border: 1px solid $color-light;
          color: $color-light;
        }
      }
      .search-history {
        margin: 0 20px;
        color: $color-light;
        font-size: $font-size-medium;
        .search-title {
          display: flex;
          margin-bottom: 20px;
          .title {
            flex: 1;
          }
        }
      }
    }
  }
  .suggest-scroll {
    position: fixed;
    top: 45px;
    bottom: 0;
    width: 100%;
  }
}
</style>


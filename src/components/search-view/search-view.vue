<template>
  <div name="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="query"></search-box>
      <div class="shortcut-wrapper">
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
        </div>
      </div>
      <suggest :query="newQuery"></suggest>
    </div>
  </div>
</template>

<script>
import SearchBox from "base/search-box/search-box";
import { getHotKey } from "api/search";
import { ERR_OK } from "common/js/config";
import Suggest from "components/suggest/suggest";

export default {
  components: {
    SearchBox,
    Suggest
  },
  created() {
    this._getHotKey();
  },
  data() {
    return {
      hotKey: [],
      newQuery: ""
    };
  },
  methods: {
    query(newQuery) {
      console.log(newQuery);
      this.newQuery = newQuery;
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.data.code === ERR_OK) {
          console.log(res.data);
          this.hotKey = res.data.result.hots;
        }
      });
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    }
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
    }
  }
}
</style>


<template>
  <div class="search-box">
    <svg @click="back" class="icon icon-search" aria-hidden="true">
      <use xlink:href="#icon-right"></use>
    </svg>
    <input ref="query" type="text" class="box" v-model="query" :placeholder="placeholder">
    <svg @click="clear" class="icon icon-dismiss" aria-hidden="true">
      <use xlink:href="#icon-cha"></use>
    </svg>
  </div>
</template>

<script>
import { debounce } from "common/js/util.js";

export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    blur() {
      this.$refs.query.blur();
    },
    back() {
      this.$router.back();
      this.query = "";
    },
    clear() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    }
  },
  created() {
    this.$watch(
      "query",
      debounce(newQuery => {
        this.$emit("query", newQuery);
      }, 200)
    );
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  background-color: $color-background;
  .icon-search {
    font-size: $font-size-large;
    color: $color-icon;
    padding: 0 10px;
  }
  .box {
    flex: 1;
    line-height: 25px;
    color: $color-text;
    font-size: $font-size-medium;
    background-color: $color-background;
    border-bottom: 1px solid $color-border-input;
    outline: none;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: $font-size-medium;
    color: $color-icon;
    padding: 0 10px;
  }
}
</style>



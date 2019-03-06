<template>
  <div class="song-list">
    <div class="button" @click="random">
      <svg class="icon icon-play" aria-hidden="true">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <div class="button-desc">
        播放全部
        <span class="button-desc-count">(共{{songs.length}}首)</span>
      </div>
    </div>
    <ul>
      <li @click="selectItem(song,index)" v-for="(song, index) in songs" :key="index" class="item">
        <div class="num">{{index+1}}</div>
        <div class="content">
          <h2 class="name">{{getSongName(song)}}</h2>
          <div class="singer">{{song.singer}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem(item, index) {
      // 本组件为基础组件，所以不去写任何逻辑，只派发这个事件，只告诉外面的父组件，这个东西被电击了，以及点击的是什么东西
      this.$emit("select", item, index);
    },
    getSongName(song) {
      if (song.alia) {
        return `${song.songName}(${song.alia})`;
      }
      return song.songName;
    },
    random() {
      this.$emit("random");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "common/scss/variable.scss";
@import "common/scss/mixin.scss";

.song-list {
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  .button {
    display: flex;
    height: 40px;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid $color-border;
    .icon-play {
      font-size: $font-size-large-x;
      width: 40px;
      text-align: center;
    }
    .button-desc {
      .button-desc-count {
        color: $color-light;
        font-size: 14px;
      }
    }
  }
  .item {
    display: flex;
    height: 64px;
    align-items: center;
    border-bottom: 1px solid $color-border;
    .num {
      width: 40px;
      text-align: center;
      flex: 0 0 40px;
      color: $color-light;
    }
    .content {
      flex: 1 1 0%;
      line-height: 20px;
      overflow: hidden;
      .name {
        width: 90%;
        @include no-row;
      }
      .singer {
        width: 90%;
        font-size: 12px;
        color: $color-light;
        padding-top: 5px;
        @include no-row;
      }
    }
  }
}
</style>


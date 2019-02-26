<template>
  <div class="song-list">
    <div class="button">
      <svg class="icon icon-play" aria-hidden="true">
        <use xlink:href="#icon-play"></use>
      </svg>
      <div class="button-desc">
        播放全部
        <span class="button-desc-count">(共{{songs.length}}首)</span>
      </div>
    </div>
    <ul>
      <li v-for="(song, index) in songs" :key="index" class="item">
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
  created() {
    setTimeout(() => {
      console.log(this.songs);
    }, 1000);
  },
  methods: {
    getSongName(song) {
      if (song.alia) {
        return `${song.songName}(${song.alia})`;
      }
      return song.songName;
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
      font-size: 20px;
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


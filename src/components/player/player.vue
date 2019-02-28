<template>
  <div class="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img :src="currentSong.image" class="image">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="i-left">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </div>
          <div class="i-left">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </div>
          <div class="i-center">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </div>
          <div class="i-right">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </div>
          <div class="i-right">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
      <div class="rotate-img">
        <img src width="40" height="40" alt>
      </div>
      <div class="text">
        <h2 class="name"></h2>
        <p class="desc"></p>
      </div>
      <div class="control">
        <svg class="icon icon-play" aria-hidden="true">
          <use xlink:href="#icon-play"></use>
        </svg>
      </div>
      <div class="control">
        <svg class="icon icon-play" aria-hidden="true">
          <use xlink:href="#icon-play"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["fullScreen", "playlist", "currentSong"])
  }
};
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }
  .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: black;
  }
}
</style>


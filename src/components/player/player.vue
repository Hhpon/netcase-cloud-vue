<template>
  <div class="player" v-show="playlist.length>0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.alPicUrl">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <svg class="icon icon-fanhui" aria-hidden="true">
              <use xlink:href="#icon-fanhui-copy-copy-copy-copy"></use>
            </svg>
          </div>
          <h1 class="title" v-html="currentSong.songName"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img :src="currentSong.alPicUrl" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="i-left icon-container">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danquxunhuan1"></use>
              </svg>
            </div>
            <div class="i-left icon-container" :class="disableCls">
              <svg @click="prev" class="icon" aria-hidden="true">
                <use xlink:href="#icon-preMusic"></use>
              </svg>
            </div>
            <div class="i-center icon-container" :class="disableCls">
              <svg @click="togglePlaying" class="icon" aria-hidden="true">
                <use v-bind:xlink:href="playIcon"></use>
              </svg>
            </div>
            <div class="i-right icon-container" :class="disableCls">
              <svg @click="next" class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiayiqu101"></use>
              </svg>
            </div>
            <div class="i-right icon-container">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanzhu1"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="rotate-img">
          <img :class="cdCls" :src="currentSong.alPicUrl" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.songName"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <svg @click.stop="togglePlaying" class="icon" aria-hidden="true">
            <use v-bind:xlink:href="playIcon"></use>
          </svg>
        </div>
        <div class="control">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lie-biao"></use>
          </svg>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="songUrl" @canplay="ready" @error="error"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "common/js/dom";
import { getSongUrl } from "api/song";

const transform = prefixStyle("transform");

export default {
  data() {
    return {
      songUrl: "",
      songReady: false
    };
  },
  computed: {
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    playIcon() {
      return this.playing ? "#icon-bofang" : "#icon-zanting";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    ...mapGetters([
      "fullScreen",
      "playlist",
      "currentSong",
      "playing",
      "currentIndex"
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
    },
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length;
      }
      this.setCurrentIndex(index);
      this.songReady = false;
    },
    ready() {
      this.songReady = true;
    },
    error() {
      // 当我们点击上一曲下一曲的时候，如果进入到的歌曲由于某些原因加载失败，ready函数永远不会执行，按钮就会失效。所以为了保证这种情况发生时可以继续使用，定义了这个方法
      this.songReady = true;
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };

      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });

      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX"
    })
  },
  watch: {
    currentSong() {
      getSongUrl(this.currentSong.songId).then(res => {
        this.songUrl = res;
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
@import "common/scss/mixin.scss";

.player {
  .normal-player {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: black;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        font-size: $font-size-large-x;
        .icon-fanhui {
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-icon;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-row();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        width: 70%;
        margin: 0 auto;
        line-height: 20px;
        text-align: center;
        @include no-row();
        font-size: $font-size-small;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-sizing: border-box;
              border: 10px solid rgba($color: #fff, $alpha: 0.1);
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        .icon-container {
          font-size: 30px;
          color: $color-icon;
          flex: 1;
          &.disable {
            color: $color-theme-d;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          font-size: 40px;
        }
        .i-right {
          text-align: left;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: $color-background-d;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .rotate-img {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        @include no-row();
        font-size: $font-size-medium;
      }
      .desc {
        @include no-row();
        font-size: $font-size-small;
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      font-size: 30px;
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>


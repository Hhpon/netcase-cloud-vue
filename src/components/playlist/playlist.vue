<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-danquxunhuan1"></use>
            </svg>
            <span class="text">{{modeText}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-laji"></use>
            </svg>
          </h1>
        </div>
        <cube-scroll ref="listContent" :data="sequenceList" class="list-content">
          <ul>
            <li class="list-item" v-for="(item,index) in sequenceList" :key="index">
              <svg class="icon icon-current" aria-hidden="true">
                <use :xlink:href="getCurrentIcon(item)"></use>
              </svg>
              <span class="text">{{item.songName}}</span>
              <svg class="icon icon-item" aria-hidden="true">
                <use xlink:href="#icon-cha"></use>
              </svg>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    modeText() {
      return this.mode === 0
        ? "顺序播放"
        : this.mode === 1
        ? "循环播放"
        : "随机播放";
    },
    ...mapGetters(["sequenceList", "currentSong", "mode"])
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    getCurrentIcon(item) {
      if (this.currentSong.songId === item.songId) {
        return "#icon-laba";
      }
      return "";
    },
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
      }, 20);  // 猜测20毫秒为v-show作用时间
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.playlist {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background-m;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter,
  &.list-fade-leave-to {
    transition: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 8px;
    background-color: $color-background-w;
    .list-header {
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .text {
          flex: 1;
          margin-left: 10px;
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .list-item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        font-size: $font-size-medium;
        .icon-current {
          color: $color-text-theme;
          margin-right: 5px;
        }
        .text {
          flex: 1;
        }
        .icon-item {
          color: $color-text-theme;
        }
      }
    }
  }
}
</style>



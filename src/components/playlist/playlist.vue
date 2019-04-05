<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <svg @click="changeMode" class="icon icon-mode" aria-hidden="true">
              <use :xlink:href="iconMode"></use>
            </svg>
            <span class="text">{{modeText}}</span>
            <svg @click.stop="showConfirm" class="icon" aria-hidden="true">
              <use xlink:href="#icon-laji"></use>
            </svg>
          </h1>
        </div>
        <cube-scroll ref="listContent" :data="sequenceList" class="list-content">
          <transition-group name="list" tag="ul">
            <li
              @click="selectItem(item,index)"
              class="list-item"
              ref="listItem"
              v-for="(item,index) in sequenceList"
              :key="index"
            >
              <svg class="icon icon-current" aria-hidden="true">
                <use :xlink:href="getCurrentIcon(item)"></use>
              </svg>
              <span class="text">{{item.songName}}</span>
              <svg @click.stop="deleteSong(item)" class="icon icon-item" aria-hidden="true">
                <use xlink:href="#icon-cha"></use>
              </svg>
            </li>
          </transition-group>
        </cube-scroll>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" content="是否清空播放列表" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { playMode } from "common/js/config";
import Confirm from "base/confirm/confirm";
import { playerMixin } from "common/js/mixin";

export default {
  mixins: [playerMixin],
  components: {
    Confirm
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? "顺序播放"
        : this.mode === playMode.loop
        ? "循环播放"
        : "随机播放";
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    confirmClear() {
      this.clearSongList();
      this.hide();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(song => {
          return song.songId === item.songId;
        });
      }
      this.setCurrentIndex(index); // 直接写无法兼容随机播放的情况，所以需要判断是什么模式
      this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      let index = this.sequenceList.findIndex(song => {
        return song.songId === current.songId;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index]);
    },
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
        this.scrollToCurrent(this.currentSong);
      }, 20); // 猜测20毫秒为v-show作用时间
    },
    hide() {
      this.showFlag = false;
    },
    deleteSong(item) {
      this.deleteOne(item);
      if (this.playlist.length === 0) {
        this.hide();
      }
    },
    ...mapActions(["deleteOne", "clearSongList"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.songId === oldSong.songId) {
        return;
      }
      this.scrollToCurrent(newSong);
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
        font-size: $font-size-medium;
        .icon-mode{
          font-size: $font-size-large;
        }
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
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s linear;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
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
    .list-close {
      line-height: 50px;
      text-align: center;
      font-size: $font-size-medium-x;
      background-color: $color-background-w;
    }
  }
}
</style>



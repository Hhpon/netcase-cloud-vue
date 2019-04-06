<template>
  <transition class="slide">
    <div class="user-center">
      <div class="header">
        <svg class="icon icon-back" aria-hidden="true" @click="back">
          <use xlink:href="#icon-right"></use>
        </svg>
        <switches @switchItem="switchItem" :currentIndex="currentIndex" :switches="switches"></switches>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <cube-scroll ref="favoriteList" :data="favoriteList" v-if="currentIndex === 0">
          <div class="inner">
            <song-list @random="random" @select="selectItem" :songs="favoriteList"></song-list>
          </div>
        </cube-scroll>
        <cube-scroll ref="playHistory" :data="playHistory" v-if="currentIndex === 1">
          <div class="inner">
            <song-list @random="random" @select="selectItem" :songs="playHistory"></song-list>
          </div>
        </cube-scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">{{noResultDesc}}</div>
    </div>
  </transition>
</template>

<script>
import Switches from "base/switches/switches";
import { mapGetters, mapActions } from "vuex";
import songList from "base/song-list/song-list";
import Song from "common/js/song";
import { playlistMixin } from "common/js/mixin";

export default {
  mixins: [playlistMixin],
  components: {
    Switches,
    songList
  },
  computed: {
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length;
      } else {
        return !this.playHistory.length;
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return "暂无收藏歌曲";
      } else {
        return "还没有听过歌曲";
      }
    },
    ...mapGetters(["favoriteList", "playHistory"])
  },
  data() {
    return {
      switches: [
        {
          name: "我喜欢的"
        },
        {
          name: "最近听的"
        }
      ],
      currentIndex: 0
    };
  },
  methods: {
    handlePlaylist() {
      const bottom = this.playlist ? "60px" : "";
      this.$refs.listWrapper.style.bottom = bottom;
      this.$refs.favoriteList && this.$refs.favoriteList.refresh();
      this.$refs.playHistory && this.$refs.playHistory.refresh();
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      if (list.length === 0) {
        return;
      }
      list = list.map(song => {
        return new Song(song);
      });
      this.randomPlay({ list });
    },
    back() {
      this.$router.back();
    },
    selectItem(song) {
      this.insertSong(new Song(song));
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    ...mapActions(["insertSong", "randomPlay"])
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide--leave-to {
  transform: translate(100%, 0);
  opacity: 0;
}
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background-w;
  .header {
    height: 44px;
    width: 100%;
    color: $color-text;
    background-color: $color-background;
    display: flex;
    align-items: center;
    position: relative;
    .icon-back {
      position: absolute;
      left: 15px;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 44px;
    bottom: 0;
    width: 100%;
    .inner {
      margin: 0 10px;
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 40%;
    bottom: 0;
    z-index: 10;
    text-align: center;
  }
}
</style>




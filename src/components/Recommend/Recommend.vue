<template>
  <div class="recommend" ref="recommend">
    <cube-scroll ref="scroll" :data="songLists" class="recommend-content">
      <!-- <div class="slider-container"> -->
      <div class="slider-item"></div>
      <slider class="slider-self"></slider>
      <div class="recommend-list-header">推荐歌单</div>
      <ul class="songlist-ul">
        <li
          @click="selectItem(songlist)"
          v-for="(songlist,index) in songLists"
          :key="index"
          class="songList-item"
        >
          <img v-lazy="songlist.picUrl">
          <div class="song-info">{{songlist.name}}</div>
          <div class="playCount-container">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cloud-headset" style="font-size: 12px;"></use>
            </svg>
            {{playCountNum(songlist)}}
          </div>
        </li>
      </ul>
      <cube-loading :size="40" class="loading_container" v-show="!songLists.length"></cube-loading>
      <div class="recommend-list-header">推荐歌曲</div>
      <ul class="songlist-ul">
        <li v-for="(songlist,index) in newSongs" :key="index" class="songList-item">
          <img v-lazy="songlist.song.album.blurPicUrl">
          <div class="newsong-info">{{songlist.name}}</div>
          <div class="song-author">{{songlist.song.artists[0].name}}</div>
        </li>
      </ul>
      <cube-loading :size="40" class="loading_container" v-show="!newSongs.length"></cube-loading>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import Slider from "components/slider/slider";
import { playlistMixin } from "common/js/mixin";
import { mapMutations } from "vuex";

export default {
  mixins: [playlistMixin],
  components: {
    Slider
  },
  data() {
    return {
      songLists: [],
      newSongs: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.getSonglist();
      this.getNewSong();
    }, 1000);
  },
  methods: {
    selectItem(songlist) {
      this.$router.push({
        path: `/recommend/${songlist.id}`
      });
      this.setDisc(songlist);
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : 0;
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    getSonglist() {
      axios.get("http://localhost:3000/personalized").then(res => {
        this.songLists = res.data.result;
      });
    },
    getNewSong() {
      axios.get("http://localhost:3000/personalized/newsong").then(res => {
        for (let i = 0; i < 9; i++) {
          this.newSongs.push(res.data.result[i]);
        }
      });
    },
    playCountNum(songlist) {
      let playCount = Math.ceil(songlist.playCount).toString();
      if (playCount.length > 9) {
        let a = playCount.slice(-10, -9);
        return a + "亿";
      } else if (playCount.length > 5) {
        let b = playCount.slice(0, -4);
        return b + "万";
      }
      return playCount;
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  }
};
</script>


<style lang="scss" scoped>
@import "common/scss/variable.scss";

.recommend {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .recommend-content {
    height: 100%;
    .slider-item {
      width: 100%;
      height: 40vh;
      position: absolute;
      top: -30vh;
      background-color: $color-background;
    }
    .slider-self {
      width: 96%;
      margin: 0 auto;
    }

    .recommend-list-header {
      height: 65px;
      font-size: 14px;
      font-weight: 700;
      color: #2e3030;
      line-height: 65px;
      padding-left: 1.5%;
    }
    .songlist-ul {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 31%;
        position: relative;
        img {
          width: 100%;
          border-radius: 5px;
        }
        .song-info {
          font-size: 13px;
          padding: 5px 0px 10px;
        }
        .newsong-info {
          font-size: 13px;
          padding: 5px 0px;
        }
        .song-author {
          font-size: 12px;
          padding-bottom: 10px;
        }
        .playCount-container {
          font-size: 12px;
          position: absolute;
          top: 2px;
          right: 2px;
          color: #fff;
        }
      }
    }
    .loading_container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

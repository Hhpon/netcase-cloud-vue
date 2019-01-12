<template>
  <div>
    <div class="scroll-container">
      <div class="scroll-item"></div>
      <Scroll class="scroll-self"></Scroll>
    </div>
    <div class="recommend-list-header">推荐歌单</div>
    <ul class="songlist-ul">
      <li v-for="(songlist,index) in songLists" :key="index" class="songList-item">
        <img :src="songlist.picUrl">
        <div class="song-info">{{songlist.name}}</div>
        <div class="playCount-container">
          <i class="iconfont icon-cloud-headset" style="font-size: 12px;"></i>
          {{playCountNum(songlist)}}
        </div>
      </li>
    </ul>
    <div class="recommend-list-header">推荐歌曲</div>
    <ul class="songlist-ul">
      <li v-for="(songlist,index) in newSongs" :key="index" class="songList-item">
        <img :src="songlist.song.album.blurPicUrl">
        <div class="newsong-info">{{songlist.name}}</div>
        <div class="song-author">{{songlist.song.artists[0].name}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import Scroll from "components/Scroll/Scroll.vue";
import axios from "axios";
export default {
  components: {
    Scroll
  },
  data() {
    return {
      songLists: [],
      newSongs: [] 
    };
  },
  mounted() {
    this.getSonglist();
    this.getNewSong();
  },
  methods: {
    getSonglist() {
      axios.get("http://localhost:3000/personalized").then(res => {
        this.songLists = res.data.result;
      });
    },
    getNewSong() {
      axios.get("http://localhost:3000/personalized/newsong").then(res => {
        for(let i = 0; i < 9; i++){
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
    }
  }
};
</script>


<style lang="scss" scoped>
.scroll-container {
  position: relative;
  .scroll-item {
    width: 100%;
    height: 90px;
    position: absolute;
    background-color: #d44439;
  }
  .scroll-self {
    width: 96%;
    margin: 0 auto;
  }
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
    .newsong-info{
      font-size: 13px;
      padding: 5px 0px;
    }
    .song-author{
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
</style>

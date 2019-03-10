<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from "components/music-list/music-list";
import { mapGetters } from "vuex";
import { getSongDetail } from "api/song";
import { createPlaylistSong } from "common/js/song";

export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.disc.name;
    },
    bgImage() {
      return this.disc.picUrl || this.disc.coverImgUrl;
    },
    ...mapGetters(["disc"])
  },
  components: {
    MusicList
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (!this.disc.id) {
        this.$router.push("/recommend");
        return;
      }
      getSongDetail(this.disc.id).then(res => {
        console.log(res);
        this.songs = this._normalizeSongs(res);
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item;
        if (musicData.id && musicData.al.id) {
          ret.push(createPlaylistSong(musicData));
        }
      });
      return ret;
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>



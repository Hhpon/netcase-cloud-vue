<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "common/js/config";
import { createSong } from "common/js/song";
import MusicList from "components/music-list/music-list";

export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.img1v1Url;
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          console.log(res.hotSongs);
          this.songs = this._normalizeSongs(res.hotSongs);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item;
        if (musicData.privilege.id && musicData.al.id) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
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
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>


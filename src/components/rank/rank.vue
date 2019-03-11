<template>
  <div class="rank" ref="rank">
    <cube-scroll class="rank-content" ref="scroll">
      <div
        @click="selectItem(topList)"
        class="topList-container"
        v-for="(topList,index) in topLists"
        :key="index"
      >
        <div class="topList-left">
          <img v-lazy="topList.coverImgUrl" height="100px">
        </div>
        <div class="topList-right">
          <div>1.{{topList.tracks[0].name}}</div>
          <div>2.{{topList.tracks[1].name}}</div>
          <div>3.{{topList.tracks[2].name}}</div>
        </div>
      </div>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { playlistMixin } from "common/js/mixin";
import { getTopList } from "api/rank";
import { mapMutations } from "vuex";

export default {
  mixins: [playlistMixin],
  data() {
    return {
      topLists: []
    };
  },
  mounted() {
    this._getTopList();
  },
  methods: {
    selectItem(topList) {
      this.$router.push({
        path: `/recommend/${topList.id}`
      });
      this.setDisc(topList);
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : 0;
      this.$refs.rank.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    _getTopList() {
      let topListArr = [17, 0, 1, 2, 3, 4, 15];
      for (let i of topListArr) {
        getTopList(i).then(topList => {
          this.topLists.push(topList);
        });
      }
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  }
};
</script>
<style lang="scss" scoped>
@import "common/scss/variable.scss";

.rank {
  position: fixed;
  top: 88px;
  bottom: 0;
  .rank-content {
    height: 100%;
    .topList-container {
      height: 100px;
      width: 100%;
      padding: 3px 0;
      margin: 0 10px;
      border-bottom: 1px solid $color-border;
      display: flex;
      .topList-left {
        img {
          border-radius: 5px;
        }
      }
      .topList-right {
        font-size: 14px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
}
</style>


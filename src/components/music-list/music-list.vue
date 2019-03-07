<template>
  <div class="music-list">
    <div class="back" @click="back">
      <svg class="icon icon-right" aria-hidden="true">
        <use xlink:href="#icon-right"></use>
      </svg>
      <h1 class="header-title" ref="title">{{headerTitle}}</h1>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <div class="list" ref="list">
      <cube-scroll class="scroll-list" ref="scrollList" @scroll="scroll" :scroll-events="scrollEvents" :options="options" :data="songs">
        <song-list @select="selectItem" @random="random" :songs="songs"></song-list>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import songList from "base/song-list/song-list";
import { prefixStyle } from "common/js/dom";
import { mapActions } from "vuex";
import { playlistMixin } from "common/js/mixin";

const RESERVED_HEIGHT = 40;
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");

export default {
  mixins: [playlistMixin],
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    bgImage: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scrollY: 0,
      headerTitle: ""
    };
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`;
    }
  },
  created() {
    this.options = {
      probeType: 3
    };
    this.scrollEvents = ["scroll"];
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight - 10;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.style.top = `${this.imageHeight}px`;
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.scrollList.$el.style.bottom = bottom;
      this.$refs.scrollList.refresh()
    },
    selectItem(item, index) {
      // 子组件只是把应该返回的数据返回回来，而不是看父组件使用什么
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    random() {
      this.randomPlay({ list: this.songs });
    },
    ...mapActions(["selectPlay", "randomPlay"])
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      this.$refs.layer.style["transform"] = `translate3d(0,${translateY}px,0)`;
      const percent = Math.abs(newY / this.imageHeight);
      if (newY > 0) {
        scale = 1 + percent;
      } else {
        blur = Math.min(20 * percent, 20);
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      if (newY < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.headerTitle = this.title;
      } else {
        zIndex = 0;
        this.$refs.bgImage.style.paddingTop = "70%";
        this.$refs.bgImage.style.height = 0;
        this.headerTitle = "";
      }
      this.$refs.bgImage.style.zIndex = zIndex;
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
    }
  },
  components: {
    songList
  }
};
</script>
<style lang="scss" scoped>
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0px;
  left: 0;
  .back {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    z-index: 50;
    display: flex;
    .icon-right {
      padding: 10px;
    }
    .header-title {
      padding-top: 10px;
    }
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background-color: #fff;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .scroll-list{
      overflow: visible;
    }
  }
}
</style>



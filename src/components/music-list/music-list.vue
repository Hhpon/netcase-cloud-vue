<template>
  <div class="music-list">
    <div class="back">
      <svg class="icon icon-right" aria-hidden="true">
        <use xlink:href="#icon-right"></use>
      </svg>
      <h1 v-html="headerTitle" class="header-title"></h1>
    </div>
    <div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    headerTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`;
    }
  }
};
</script>
<style lang="scss" scoped>
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
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
}
</style>



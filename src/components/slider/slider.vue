<template>
  <div>
    <cube-slide ref="slide" :data="bannerList" class="slider">
      <cube-slide-item v-for="(banner,index) in bannerList" :key="index" class="slider-group">
        <img :src="banner.imageUrl" class="slider-item">
      </cube-slide-item>
      <template slot="dots" slot-scope="props">
        <span
          class="slide-dot"
          :class="{active: props.current === index}"
          v-for="(item, index) in props.dots"
          :key="index"
        >{{index + 1}}</span>
      </template>
    </cube-slide>
  </div>
</template>

<script>
import { getBannerList } from "common/api/recommend.js";

export default {
  data() {
    return {
      bannerList: []
    };
  },
  mounted() {
    this._getBannerList();
  },
  methods: {
    _getBannerList() {
      getBannerList()
        .then(result => {
          this.bannerList = result.banners;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  .slider-item {
    width: 100%;
    border-radius: 5px;
  }
  .slide-dot {
    display: inline-block;
    height: 7px;
    width: 7px;
    margin: 5px 2px;
    border-radius: 50%;
    background-color: #f0f1f2;
    cursor: pointer;
  }
  .active {
    background-color: #f76a69;
  }
}
</style>



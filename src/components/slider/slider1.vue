<template>
  <div>
    <div class="carousel-wrap" ref="carousel">
      <transition-group
        tag="ul"
        name="list"
        class="scroll-ul"
        v-if="imgs.length"
        :style="{height: imgHeight+'px'}"
      >
        <li
          v-for="(img,indexNum) in imgs"
          v-show="indexNum === mark"
          :key="img.encodeId"
          @mouseenter="stop"
          @mouseleave="go"
        >
          <img :src="img.imageUrl" ref="img">
        </li>
      </transition-group>
      <div class="carousel-items"> 
        <span
          v-for="(item,index) in imgs.length"
          :class="{'active':index===mark}"
          :key="index"
          @mouseover="change(index)"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      mark: 1,
      imgs: [],
      imgHeight: 0,
      timer: null
    };
  },
  created() {
    this.getImgs();
  },
  mounted() {
    this.$nextTick(() => {
      this.timer = setInterval(this.autoplay, 3000);
    });
  },
  methods: {
    getImgs() {
      axios.get("http://localhost:3000/banner").then(res => {
        this.imgs = res.data.banners;
        let realWidth = this.$refs.carousel.offsetWidth;
        let img = new Image();
        img.src = res.data.banners[0].imageUrl;
        let that = this;
        img.onload = function() {
          that.imgHeight = (img.naturalHeight * realWidth) / img.naturalWidth;
        };
      });
    },
    autoplay() {
      this.mark++;
      if (this.mark === this.imgs.length) {
        this.mark = 0;
      }
    },
    go() {
      console.log("移出去");
      this.timer = setInterval(this.autoplay, 3000);
    },
    stop() {
      console.log("移进来");
      clearInterval(this.timer);
      this.timer = null;
    },
    change(index) {
      this.mark = index;
    }
  },
  destroyed() { // 如果页面内有定时器，需要在组件销毁的时候清除定时器，以释放内存，这是一个比较好的编程习惯
    console.log("组件销毁了")
    clearTimeout(this.timer)
  }
};
// 由于无法获取到图片的高度，放弃这个方法
</script>
<style lang="scss" scoped>
.carousel-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  .scroll-ul {
    width: 100%;
    li {
      position: absolute;
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .carousel-items {
    position: absolute;
    z-index: 10;
    width: 100%;
    bottom: 5%;
    text-align: center;
    span {
      display: inline-block;
      height: 9px;
      width: 9px;
      margin: 0 2px;
      border-radius: 50%;
      background-color: #f0f1f2;
      cursor: pointer;
    }
    .active {
      background-color: #f76a69;
    }
  }
}

.list-enter-to {
  transition: all 0.5s ease;
  transform: translateX(0);
}
.list-leave-active {
  transition: all 0.5s ease;
  transform: translateX(-100%);
}
.list-enter {
  transform: translateX(100%);
}
.list-leave {
  transform: translateX(0);
}
</style>



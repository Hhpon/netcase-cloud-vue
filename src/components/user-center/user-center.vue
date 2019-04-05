<template>
  <transition class="slide">
    <div class="user-center">
      <div class="header">
        <svg class="icon icon-back" aria-hidden="true">
          <use xlink:href="#icon-right"></use>
        </svg>
        <switches @switchItem="switchItem" :currentIndex="currentIndex" :switches="switches"></switches>
      </div>
      
    </div>
  </transition>
</template>

<script>
import Switches from "base/switches/switches";

export default {
  components: {
    Switches
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
    switchItem(index) {
      this.currentIndex = index;
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
}
</style>




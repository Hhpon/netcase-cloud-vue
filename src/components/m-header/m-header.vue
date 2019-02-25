<template>
  <div class="header">
    <!-- <img class="header-imgs" src="@/common/imgs/category.svg"> -->
    <svg class="icon header-imgs" aria-hidden="true">
      <use xlink:href="#icon-gengduo"></use>
    </svg>
    <div class="header-text">VMUSIC</div>
    <!-- <img class="header-imgs" src="@/common/imgs/search.svg"> -->
    <svg class="icon header-imgs" aria-hidden="true">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
@import "common/scss/variable.scss";

.header {
  letter-spacing: 4px;
  height: 44px;
  background-color: $color-background;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-imgs {
    padding: 11px;
    height: 22px;
    font-size: 20px;
    color: $color-icon;
  }
  .header-text {
    color: aliceblue;
    font-family: "Times New Roman", Times, serif;
  }
}
</style>

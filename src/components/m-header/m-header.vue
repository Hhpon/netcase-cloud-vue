<template>
  <div>
    <div class="header">
      <img class="header-imgs" src="@/common/imgs/category.svg" alt>
      <div class="header-text">VMUSIC</div>
      <img class="header-imgs" src="@/common/imgs/search.svg" alt>
    </div>
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
  }
  .header-text {
    color: aliceblue;
    font-family: "Times New Roman", Times, serif;
  }
}
</style>

<template>
  <div class="tabber">
    <router-link class="tabber-link" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link class="tabber-link" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link class="tabber-link" to="/singer">
      <span>歌手</span>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
@import "common/scss/variable.scss";

.tabber {
  height: 44px;
  background-color: $color-background;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .tabber-link {
    text-decoration: none;
    font-size: 14px;
    color: aliceblue;
  }
  .router-link-active {
    letter-spacing: 2px;
    font-weight: 700;
    padding-bottom: 3px;
    display: block;
    border-bottom: 2px solid aliceblue;
  }
}
</style>
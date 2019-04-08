<template>
  <div class="header">
    <router-link to='/user'>
      <svg class="icon header-imgs" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </router-link>
    <div class="header-text">NMUSIC</div>
    <router-link to="/search">
      <svg class="icon header-imgs" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  methods: {
    selectSearch() {
      this.$router.push("/search");
    }
  }
};
</script>

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

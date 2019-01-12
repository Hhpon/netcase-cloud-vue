<template>
  <div id="app">
    <m-header></m-header>
    <tabber></tabber>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header"
import Tabber from 'components/tabber/tabber'

export default {
  components: {
    MHeader,
    Tabber
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

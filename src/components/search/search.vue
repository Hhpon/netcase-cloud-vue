<template>
  <transition name="search">
    <search-view></search-view>
  </transition>
</template>

<script>
import SearchView from "components/search-view/search-view";

export default {
  components: {
    SearchView
  }
};
</script>


<style lang="scss" scoped>
.search-enter-active,
.search-leave-active {
  transition: all 0.3s;
}
.search-enter,
.search-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
</style>


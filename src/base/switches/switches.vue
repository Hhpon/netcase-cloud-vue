<template>
  <ul class="switches">
    <li
      @click="switchItem(index)"
      class="switches-item"
      :class="{'active':currentIndex === index}"
      v-for="(item,index) in switches"
      :key="index"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit("switchItem", index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.switches {
  width: 240px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  .switches-item {
    flex: 1;
    padding: 8px;
    margin: 0 20px;
    text-align: center;
    font-size: $font-size-medium;
    color: #fff;
    &.active {
      border-bottom: 2px solid $color-border;
      // background: $color-highlight-background;
    }
  }
}
</style>

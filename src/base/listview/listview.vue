<template>
  <cube-index-list :data="data" class="singers-content">
    <cube-index-list-group
      v-for="(group,index) in data"
      :key="index"
      :group="group"
      class="list-group"
    >
      <cube-index-list-item
        v-for="(item,index) in group.items"
        :key="index"
        :item="item"
        class="list-group-item"
        @select="selectItem"
      >
        <img v-lazy="item.img1v1Url" class="avator">
        <div class="name">{{item.name}}</div>
      </cube-index-list-item>
    </cube-index-list-group>
  </cube-index-list>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem(item) {
      this.$emit("select", item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.singers-content {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .list-group {
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 0 5px;
      border-bottom: 1px solid $color-border;
      .avator {
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }
      .name {
        padding-left: 15px;
      }
    }
  }
}
</style>



<template>
  <div class="singers">
    <!-- <cube-scroll ref="scroll" :data="data" class="singers-content">
      <ul>
        <li v-for="group in data" :key="group.title" class="list-group">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul class="list-group-block">
            <li class="list-group-item" v-for="(item,index) in group.items" :key="index">
              <img v-lazy="item.img1v1Url" class="avator">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </cube-scroll>-->
    <cube-index-list :data="data" class="singers-content">
      <cube-index-list-group v-for="(group,index) in data" :key="index" :group='group' class="list-group">
        <cube-index-list-item
          v-for="(item,index) in group.items"
          :key="index"
          :item='item'
          class="list-group-item"
        >
          <img v-lazy="item.img1v1Url" class="avator">
          <div class="name">{{item.name}}</div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.data);
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.singers {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .singers-content {
    height: 100%;
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
}
</style>



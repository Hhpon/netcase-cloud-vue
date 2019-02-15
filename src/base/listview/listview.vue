<template>
  <div>
    <cube-scroll ref="scroll" :data="data">
      <ul>
        <li v-for="group in data" :key="group.title" class="list-group">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li class="list-group-item" v-for="(item,index) in group.items" :key="index">
              <img :src="item.picUrl" alt class="avator">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  }
};
</script>


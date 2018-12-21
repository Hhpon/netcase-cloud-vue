<template>
  <div>
      <search-view></search-view>
      <div>
          <search-item :itemContent='content'/>
          <search-item :itemContent='热门搜索2'/>
          <search-item :itemContent='热门搜索3'/>
      </div>
      <div>{{content}}</div>
  </div>
</template>
<script>
import searchView from '../compontents/SearchInput.vue'
import SearchItem from '../compontents/SearchItem.vue'
export default {
  data() {
    return {
      content: "接收输入的值"
    };
  },
  compontent: {
    searchView,
    searchItem
  }
};
</script>


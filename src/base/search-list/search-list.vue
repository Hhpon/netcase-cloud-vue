<template>
  <div class="search-list">
    <ul>
      <li
        @click="select(item)"
        v-for="(item,index) in searchHistory"
        :key="index"
        class="search-warapper"
      >
        <span class="search-text">{{item}}</span>
        <svg @click.stop="deleteOne(item)" class="icon" aria-hidden="true">
          <use xlink:href="#icon-cha"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    select(item) {
      this.$emit("select", item);
    },
    deleteOne(item) {
      this.$emit("deleteOne", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-list {
  width: 100%;
  .search-warapper {
    display: flex;
    margin-bottom: 20px;
    .search-text {
      flex: 1;
    }
  }
}
</style>


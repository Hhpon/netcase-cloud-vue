<template>
  <div></div>
</template>
<script>
import axios from "axios";
import pinyin from "pinyin";
export default {
  data() {
    return {};
  },
  computed: {
    singerList(){
      return this.$store.state.singer.singerList
    }
  },
  mounted() {
    console.log(this.singerList);
    this.$store.dispatch("getSinger");
    console.log(this.singerList);
  },
  methods: {}
};
</script>


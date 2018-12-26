<template>
  <div>
    <Header></Header>
    <Tab></Tab>
  </div>
</template>
<script>
import Header from "../../components/Header/Header.vue";
import Tab from "../../components/Tab/Tab.vue";
import axios from "axios";
export default {
  components: {
    Header,
    Tab
  },
  data() {
    return {
      imgs: [],
      imgHeight: 0
    };
  },
  mounted() {}
};
</script>





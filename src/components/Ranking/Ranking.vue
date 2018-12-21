<template>
  <div>
    <div class="topList-container" v-for="(topList,index) in topLists" :key="index">
      <div class="topList-left">
        <img :src="topList.coverImgUrl" height="100px">
      </div>
      <div class="topList-right">
        <div>1.{{topList.tracks[0].name}}</div>
        <div>2.{{topList.tracks[1].name}}</div>
        <div>3.{{topList.tracks[2].name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      topLists: []
    };
  },
  mounted() {
    this.getTopList();
  },
  methods: {
    getTopList() {
      let topListArr = [17, 0, 1, 2, 3, 4, 15];
      for (let i = 0; i < topListArr.length; i++) {
        axios
          .get("http://localhost:3000/top/list", {
            params: {
              idx: topListArr[i]
            }
          })
          .then(res => {
            console.log(res.data);
            this.topLists.push(res.data.playlist);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.topList-container {
  height: 100px;
  width: 100%;
  padding: 3px 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .topList-left {
    img {
      border-radius: 5px;
    }
  }
  .topList-right {
    font-size: 14px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>


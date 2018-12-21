<template>
    <div>
        <div class='header'>
          <img class="header-imgs" src="@/assets/imgs/category.svg" alt="">
          <div class='header-text'>VMUSIC</div>
          <img class="header-imgs" src="@/assets/imgs/search.svg" alt="">
        </div>
    </div>  
</template>
<style lang="scss" scoped>
.header {
  letter-spacing: 4px;
  height: 44px;
  background-color: #d44439;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-imgs {
    padding: 11px;
    height: 22px;
  }
  .header-text {
    color: aliceblue;
    font-family: "Times New Roman", Times, serif;
  }
}
</style>

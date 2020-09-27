import "babel-polyfill"
import Vue from "vue"
import "./cube-ui"
import App from "./App.vue"
import router from "./router"
import store from "./vuex/store"
import "common/scss/index.scss"
import "common/icon/iconfont"
import "./registerServiceWorker"
import fastclick from "fastclick"
import VueLazyLoad from "vue-lazyload"
import VConsole from "vconsole"

fastclick.attach(document.body) // 解决移动端点击300ms延迟

Vue.use(VueLazyLoad, {
  loading: require("common/imgs/default.png"),
})

/* eslint-disable no-unused-vars */
// var vConsole = new VConsole()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

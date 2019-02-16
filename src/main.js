import 'babel-polyfill'
import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './common/icon/iconfont.css'
import './common/scss/index.scss'
import './registerServiceWorker'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body) // 解决移动端点击300ms延迟

Vue.use(VueLazyLoad,{
  loading: require('common/imgs/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

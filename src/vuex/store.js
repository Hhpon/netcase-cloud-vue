import Vue from 'vue'
import vuex from 'vuex'
import singer from './modules/singer'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    singer: singer
  }
})

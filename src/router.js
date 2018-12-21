import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index/Index.vue'
import Recommend from './components/Recommend/Recommend.vue'
import Ranking from './components/Ranking/Ranking.vue'
import Singer from './components/Singer/Singer.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/recommend',
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        path: 'rank',
        name: 'Ranking',
        component: Ranking
      },
      {
        path: 'singer',
        name: 'Singer',
        component: Singer
      }
    ]
  },
  ]
})

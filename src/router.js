import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './components/recommend/recommend.vue'
// import Ranking from './components/Ranking/Ranking.vue'
import Singer from './components/singer/singer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/recommend',
    //   children: [
    //     {

    //       path: 'recommend',
    //       name: 'Recommend',
    //       component: Recommend
    //     },
    //     {
    //       path: 'rank',
    //       name: 'Ranking',
    //       component: Ranking
    //     },
    //     {
    //       path: 'singer',
    //       name: 'Singer',
    //       component: Singer
    //     }
    //   ]
    // },
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
})

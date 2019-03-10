import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend.vue'
import Rank from 'components/rank/rank.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'
import Disc from 'components/disc/disc.vue'

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
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})

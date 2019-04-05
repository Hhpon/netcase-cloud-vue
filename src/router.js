import Vue from "vue";
import Router from "vue-router";
import Recommend from "components/recommend/recommend";
import Rank from "components/rank/rank";
import Singer from "components/singer/singer";
import SingerDetail from "components/singer-detail/singer-detail";
import Disc from "components/disc/disc";
import Search from "components/search/search";
import UserCenter from 'components/user-center/user-center'

Vue.use(Router);

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
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      component: Recommend,
      children: [
        {
          path: ":id",
          component: Disc
        }
      ]
    },
    {
      path: "/rank",
      component: Rank,
      children: [
        {
          path: ":id",
          component: Disc
        }
      ]
    },
    {
      path: "/singer",
      component: Singer,
      children: [
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: "/search",
      component: Search,
      children: [
        {
          path: "singer/:id",
          component: SingerDetail
        },
        {
          path: "disc/:id",
          component: Disc
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
});

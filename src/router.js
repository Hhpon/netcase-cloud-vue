import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Recommend = ((resolve)=>{
  import ('components/recommend/recommend').then((module)=>{
    resolve(module)
  })
})

const Rank = ((resolve)=>{
  import ("components/rank/rank").then((module)=>{
    resolve(module)
  })
})

const Singer = ((resolve)=>{
  import ("components/singer/singer").then((module)=>{
    resolve(module)
  })
})

const SingerDetail = ((resolve)=>{
  import ("components/singer-detail/singer-detail").then((module)=>{
    resolve(module)
  })
})

const Disc = ((resolve)=>{
  import ("components/disc/disc").then((module)=>{
    resolve(module)
  })
})

const Search = ((resolve)=>{
  import ("components/search/search").then((module)=>{
    resolve(module)
  })
})

const UserCenter = ((resolve)=>{
  import ('components/user-center/user-center').then((module)=>{
    resolve(module)
  })
})

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

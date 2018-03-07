import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Movie from '@/components/Movie'
import Tv from '@/components/Tv'
import User from '@/components/User'
import Search from '@/components/Search'
import MoiveDetail from '@/components/MoiveDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/movie',
      name: Movie,
      component: Movie,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/tv',
      name: 'Tv',
      component: Tv,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/all/search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/movie/detail/:movie_id',
      name: 'MoiveDetail',
      component: MoiveDetail
    }
  ]
})

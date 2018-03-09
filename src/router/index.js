import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import Index from '@/components/Index'
import Movie from '@/components/Movie'
import Tv from '@/components/Tv'
import User from '@/components/User'
import Search from '@/components/Search'
import MoiveDetail from '@/components/MoiveDetail'
import History from '@/components/History'
import Favorite from '@/components/Favorite'
import About from '@/components/About'
import Settings from '@/components/Settings'
import Login from '@/components/Login'
import TestLogin from '@/components/TestLogin'

Vue.use(Router)

const router = new Router({
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
      path: '/user/history',
      name: 'History',
      component: History
    },
    {
      path: '/user/favorite',
      name: 'Favorite',
      component: Favorite
    },
    {
      path: '/user/about',
      name: 'About',
      component: About
    },
    {
      path: '/user/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/test',
      name: 'TestLogin',
      component: TestLogin,
      // 需要登录后才能访问
      meta: {
        needLogin: true
      }
    }
  ]
})

// 路由进去之前做处理
router.beforeEach((to, from, next) => {
  let isLogin = store.state.user.is_login // 是否登录
  // 判断配置的路由中是否存在needLogin存在则做出对应的判断
  if (to.matched.some(record => record.meta.needLogin)) {
    // 从状态管理器（vuex）中获取登录状态，如果未登录过的跳转至登录页
    if (!isLogin) {
      // next({
      //   path: '/user/login',
      //   query: {
      //     redirect: to.path.slice(1)
      //   }
      // })
      router.push({
        path: '/user/login',
        query: {
          redirect: to.path.slice(1) // 记录要登录后跳转的目标链接
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

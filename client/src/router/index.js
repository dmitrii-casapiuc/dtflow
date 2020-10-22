import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'
import store from '@/store'

NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'auth' },
    component: () => import('@/views/auth/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'auth' },
    component: () => import('@/views/auth/register.vue')
  },
  {
    path: '/',
    name: 'Analytics',
    meta: { layout: 'main' },
    component: () => import('@/views/analytics/index.vue')
  },
  {
    path: '/daily-planner',
    name: 'DailyPlanner',
    meta: { layout: 'main' },
    component: () => import('@/views/daily-planner/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main' },
    component: () => import('@/views/profile/index.vue')
  },
  {
    path: '*',
    meta: { layout: 'empty' },
    component: () => import('@/views/error-pages/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      try {
        await store.dispatch('user/fetchInfo')
        next()
        NProgress.done()
      } catch (error) {
        await store.dispatch('user/logout')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    // has no token
    if (whiteList.includes(`/${to.path.split('/')[1]}`)) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

export default router

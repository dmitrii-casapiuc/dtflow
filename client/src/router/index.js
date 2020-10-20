import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login?message=login&type=error')
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'auth' },
    beforeEnter: ifNotAuthenticated,
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'auth' },
    beforeEnter: ifNotAuthenticated,
    component: () => import('@/views/Register/index.vue')
  },
  {
    path: '/',
    name: 'Analytics',
    meta: { layout: 'main' },
    beforeEnter: ifAuthenticated,
    component: () => import('@/views/Analytics/index.vue')
  },
  {
    path: '/daily-planner',
    name: 'DailyPlanner',
    meta: { layout: 'main' },
    beforeEnter: ifAuthenticated,
    component: () => import('@/views/DailyPlanner/index.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    meta: { layout: 'main' },
    beforeEnter: ifAuthenticated,
    component: () => import('@/views/Notes/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main' },
    beforeEnter: ifAuthenticated,
    component: () => import('@/views/Profile/index.vue')
  },
  {
    path: '*',
    meta: { layout: 'empty' },
    component: () => import('@/views/ErrorPages/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

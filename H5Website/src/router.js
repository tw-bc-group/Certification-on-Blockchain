import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/issue',
      name: 'issue',
      component: () => import('./views/Issue.vue')
    },
    {
      path: '/certification/:id',
      name: 'certification',
      component: () => import('./views/Certification.vue')
    }
  ]
})

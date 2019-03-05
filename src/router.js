import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Sale from './views/Sale.vue'
import NotFound from './views/NotFound.vue'

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
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/sales/:id',
      name: 'sale',
      component: Sale
    },
    {
      path: '/404',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Sale from './views/Sale.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import Terms from './views/Terms.vue'
import Privacy from './views/Privacy.vue'

Vue.use(Router)

const router = new Router({
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
      component: Create,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/sales/:id',
      name: 'sale',
      component: Sale
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/404',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '*',
      redirect:'/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router
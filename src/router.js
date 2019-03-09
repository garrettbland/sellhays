import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

// Import Routes
import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Account from './views/Account.vue'
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
      path: '/account',
      name: 'account',
      component: Account,
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
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentUser = store.state.currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else {
        next()
    }
})

export default router
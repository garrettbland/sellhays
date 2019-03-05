import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/firebaseConfig.js')
Vue.use(Vuex)

// handle page reloads
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
    }
})

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  }
})

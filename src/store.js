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

const store = new Vuex.Store({
  state: {
  	currentUser:null,
  },
  mutations: {
  	setCurrentUser(state, val) {
        state.currentUser = val
    },
  },
  actions: {
  	clearData({ commit }){
      commit('setCurrentUser',null)
    }
  }
})

export default store
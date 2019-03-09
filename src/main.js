import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const fb = require('./firebaseConfig.js')
import './main.css'

//Extend prototype so we can use firebase config throughout app
//without referencing everytime
Vue.prototype.$firebase = fb

Vue.config.productionTip = false

// make sure firebase is initialized for page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})

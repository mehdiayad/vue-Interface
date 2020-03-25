// IMPORTS
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import myMixin from './mixins/index'
import myAxios from './axios/index'
import myRouter from './router/index'
import myNavbarStore from './store/navbarStore'
import myUserStore from './store/userStore'
import myStore from './store/index'
import cronJob from './cron/index'
import crosstabs from './crosstabs/index'

// Vue variables
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.mixin(myMixin)

// Window variables
window.axios = myAxios
window.router = myRouter
window.navbarStore = myNavbarStore
window.userStore = myUserStore
window.cronJob = cronJob
window.crosstabs = crosstabs

// VUE INSTANCE
var vm = new Vue({
  router: myRouter,
  store: myStore,
  render: h => h(require('./App').default),
  //render: h => h(App),  
}).$mount('#app')

// BROWSER CONSOLE INSTANCE
global.vm = vm
global.vuex = Vuex
global.store = myStore

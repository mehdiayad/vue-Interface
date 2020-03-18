// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import store from './store/index'

import {functionsMixin} from './mixins/index'
import myAxios from './axios/index'
import myRouter from './router/index'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.mixin(functionsMixin)

Vue.config.productionTip = false

window.axios = myAxios
window.router = myRouter

var vm = new Vue({
  router,
  store,
  render: h => h(require('./App').default),
  //render: h => h(App),
}).$mount('#app')

// Registration for console 
global.vm = vm
global.v = Vuex
global.store = store



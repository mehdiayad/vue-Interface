// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import router from './router/index'
import store from './store/index'
import {functionsMixin} from './mixins/index'
import axios from './axios/index'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.mixin(functionsMixin)

Vue.config.productionTip = false

Vue.prototype.$axios = axios; 

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



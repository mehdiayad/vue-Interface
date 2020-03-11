// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router'
import store from './store/store'
import {functionsMixin} from './mixins/functionsMixin'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.mixin(functionsMixin)

Vue.config.productionTip = false

var vm  = new Vue({
  router,
  store,
  render: h => h(require('./App').default),
  //render: h => h(App),
}).$mount('#app')

// Registration for console 
global.vm = vm
global.v = Vuex
global.store = store



// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
//import App from './App'


// Additionnal Vues
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import ProductIndex from './components/ProductIndex.vue'
import ProductShow from './components/ProductShow.vue'
import Counter from './components/Counter.vue'
import Alert from './components/Alert.vue'


Vue.use(Vuex)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode:'history',
  routes: [
  {
    path:'*',
    redirect: '/'
  },
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/home',
    name: 'home',
    component: Home
  },
  {
    path:'/counter',
    name: 'counter',
    component: Counter
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
    path:'/product',
    name: 'product_index',
    component: ProductIndex
  },
  {
    path:'/product/:id',
    name: 'product_show',
    component: ProductShow
  },
  {
    path:'/alert',
    name: 'alert',
    component: Alert
  }]
})

new Vue({
  router,
  render: h => h(require('./App').default),
  //render: h => h(App),
}).$mount('#app')

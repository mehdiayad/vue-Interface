// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'

// Additionnal Vues
import App from './App.vue'
import Hello from './components/HelloWorld.vue'
import PageA from './components/PageA.vue'
//import Product from './components/Product.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode:'history',
  routes: [{
    path:'/',
    component: Hello
  },{
    path:'/page',
    component: PageA
  },{
    path:'/product',
    component: PageA
  },{
    path:'*',
    redirect: '/'
  }]
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

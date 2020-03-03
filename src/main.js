// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'


// Additionnal Vues
import App from './App.vue'
import Hello from './components/HelloWorld.vue'
import PageA from './components/PageA.vue'
import ProductIndex from './components/ProductIndex.vue'
import ProductShow from './components/ProductShow.vue'

Vue.use(VueRouter)


Vue.config.productionTip = false

const router = new VueRouter({
  mode:'history',
  routes: [{
    path:'/',
    name: 'hello',
    component: Hello
  },{
    path:'/page',
    name: 'page',
    component: PageA
  },{
    path:'/product',
    name: 'product_index',
    component: ProductIndex
  },{
    path:'/product/:id',
    name: 'product_show',
    component: ProductShow
  },{
    path:'*',
    redirect: '/'
  }]
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

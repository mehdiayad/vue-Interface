// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'

// Additionnal Vues
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import ProductIndex from '../components/ProductIndex.vue'
import ProductShow from '../components/ProductShow.vue'
import CartIndex from '../components/CartIndex.vue'
import CartConfirm from '../components/CartConfirm.vue'
import myUserStore from '../store/userStore'


Vue.use(VueRouter)

var router = new VueRouter({
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
    path:'*',
    redirect: '/'
  },
  {
    path:'/cart',
    name: 'cart_index',
    component: CartIndex
  },
  {
    path:'/cart/confirm',
    name: 'cart_confirm',
    component: CartConfirm
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
  }]
})

router.beforeEach((to, from, next) => {
  
  if (to.name == 'login' && myUserStore.userConnected == true){
    next({ name: 'home' })
  }

  if (to.name !== 'login' && myUserStore.userConnected == false){
    next({ name: 'login' })
  }
  else {
    next()
  }

})

export default router

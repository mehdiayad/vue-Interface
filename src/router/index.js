// Default Vues
import Vue from 'vue'
import VueRouter from 'vue-router'

// Additionnal Vues
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import ProductIndex from '../components/ProductIndex.vue'
import ProductShow from '../components/ProductShow.vue'
import CartIndex from '../components/CartIndex.vue'
import Clients from '../components/Passeport/Clients.vue'
import AuthorizedClients from '../components/Passeport/AuthorizedClients.vue'
import PersonalAccessTokens from '../components/Passeport/PersonalAccessTokens.vue'

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
    path:'/clients',
    name: 'clients',
    component: Clients
  },
  {
    path:'/authorizedClients',
    name: 'authorizedClients',
    component: AuthorizedClients
  },
  {
    path:'/personalAccessTokens',
    name: 'personalAccessTokens',
    component: PersonalAccessTokens
  },
  {
    path:'/cart',
    name: 'cart_index',
    component: CartIndex
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
  
  var isAuthenticated = false
  var local = JSON.parse(localStorage.getItem('user'))
  
  if(local != null){
    isAuthenticated = local.userConnected
  }     
  
  if (to.name == 'login' && isAuthenticated){
    next({ name: 'home' })
  }

  if (to.name !== 'login' && !isAuthenticated){
    next({ name: 'login' })
  }
  else {
    next()
  }

})

export default router

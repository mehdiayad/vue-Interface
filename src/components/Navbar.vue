<template>

  <div class="container-fluid ">
    <div class="row bg-info align-items-center py-1 ">

      <div class="col-1 col-sm-1 text-center px-0">
          <a class="btn mx-auto" @click="goHomePage()"> 
            <h3 class="text-white">VueJS</h3>
          </a>        			
      </div>

      <div class="col-2 col-sm-2">
      </div>

      <div class="col-6 col-sm-6 py-3 px-0">
        <div class="input-group border rounded">
          <div class="container">
            <div class="row">
              
              <div class="input-group-prepend col-4 col-sm-4 px-0"> 
                <select v-model.number="categorySearch" class="w-100 bg-info text-white">
                      <option v-for="(category, index) in categories" :key="index" :value="index"> {{category}} </option>
                </select>
              </div>
          
              <input class="search-bar col-6 col-sm-6" v-model="productSearch" placeholder="Rechercher un produit"/>

              <div class="input-group-append col-1 col-sm-1">
                  <a class="btn my-0 py-0" @click='searchProducts()'> <i class="fa fa-search fa-2x text-white px-2 h-100 w-100" aria-hidden="true"></i> </a>
              </div>

            </div>
          </div>
          
          </div>

      </div>

      <div class="col-2 col-sm-2">
          <div class="dropdown show">
            <a class="btn bg-white text-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{userName}}
            </a>

            <div class="dropdown-menu bg-white text-dark" aria-labelledby="dropdownMenuLink">
              <!--
              <a class="dropdown-item text-dark" href="/clients" > <i class="fas fa-chevron-right"></i> Clients </a>
              <a class="dropdown-item text-dark" href="/authorizedClients" > <i class="fas fa-chevron-right"></i> Authorized Clients </a>
              <a class="dropdown-item text-dark" href="/personalAccessTokens" > <i class="fas fa-chevron-right"></i> Personal Access Tokens </a>
              -->
              <a class="dropdown-item text-dark" href="" @click='logout()'> <i class="fas fa-chevron-right"></i> Deconnexion </a>
            </div>

          </div>
      </div>

      	 <div class="col-1 col-sm-1">
            <div class="row">
              <router-link :to="{ name: 'cart_index', params: { id: userId } }">

                  <div class="col-12 col-sm-12 text-white card_number">
                      <h4> {{cartNumber}} </h4>
                  </div>

                  <div class="col-12 col-sm-12 card_shop">
                    <i @click="fillCategories()" class="fas fa-shopping-cart fa-3x text-white"></i> 
                  </div>
              </router-link>
            </div>
        </div>


    </div>
  </div>

</template>

<script>
import axios from 'axios'
import router from '../router/index'
import userStore from '../store/userStore'
import navbarStore from '../store/navbarStore'


export default {

  data() {
    return {
      categorySearch: navbarStore.getters.getCategorySearch,
      productSearch: navbarStore.getters.getProductSearch,
      categoryTemp: [],
    }
  },
  computed: {
    cartNumber: {
      get: function() { return navbarStore.getters.getCartNumber },
      set: function(value) {this.cartNumber = value}
    },
    userName: {
      get: function() { return userStore.getters.getUserName },
      set: function(value) {this.userName = value}
    },
    userId: {
      get: function() { return userStore.getters.getUserId },
      set: function(value) {this.userId = value}
    },
    categories: {
      get: function() { return navbarStore.getters.getCategories},
      set: function(value) {this.categories = value}
    },
    test: {
      get: function() {return router.currentRoute.name},
      set: function(value) {this.test = value}
    }
  },
  mounted: function() {
    if(userStore.getters.getUserTokenAccess != null){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.getters.getUserTokenAccess;
      console.log(axios.defaults.headers.common['Authorization'].substring(0, 25))    
      this.getCategories()
    }

  },
  methods : {
    getCategories: function(){
      //console.log('[GetCategories] START')
      var url = process.env.VUE_APP_API_BASE_URL + 'category'

    axios.get(url)
        .then((response) => {
          //console.log(response.data)
          this.categoryTemp = response.data
          this.fillCategories()
        })
        .catch(function (error) {
          console.log(error)
         })
    },
    fillCategories: function(){
      //console.log('[FillCategories] START')
      this.categories[0]='Toutes les categories'
      for(var i= 0; i < this.categoryTemp.length; i++){
        this.categories[this.categoryTemp[i].id] = this.categoryTemp[i].name
      }

      //console.log(this.categories2)
      navbarStore.commit('setCategories',this.categories)

    },
    searchProducts: function() {
      //console.log('[V]NAVBAR [M]SEARCHPRODUCTS [S]ENTER')

      navbarStore.commit('setCategorySearch',this.categorySearch)
      navbarStore.commit('setProductSearch',this.productSearch)
      
      
      if(router.currentRoute.name == 'product_index'){
        router.go()
      }else{
        router.push({ name: 'product_index'})
      }

    },
    logout: function(){

      //userStore.commit('setUserEmail',null)
      userStore.commit('setUserId',null)
      userStore.commit('setUserConnected',false)
      userStore.commit('setUserInformations',null)
      userStore.commit('setUserName',null)
      userStore.commit('setUserTokenType',null)
      userStore.commit('setUserTokenExpire',null)
      userStore.commit('setUserTokenAccess',null)
      userStore.commit('setUserTokenRefresh',null)
      
      router.push({ name: 'login'})

    },
    goHomePage: function(){

      navbarStore.commit('setProductSearch',null)
      navbarStore.commit('setCategorySearch',0)

      if(router.currentRoute.name == 'home'){
        router.go()
      }else{
        router.push({ name: 'home'})
      }

    } 
  }
}
</script>

<style scoped>

a{
  color:white;
}

.card_number
{
  position: absolute;
  left: 5px;
  top: -35px;
  z-index: 1;
}

.card_shop
{
  position: absolute;
  left: 0px;
  top: -15px;
  z-index: 1;
}

.input-group-append{
  min-width: 70px;
}

</style>
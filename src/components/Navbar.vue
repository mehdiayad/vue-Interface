<template>

  <div class="container-fluid ">
    <div class="row bg-info align-items-center py-1 ">

      <div class="col-1 col-sm-1">
        <router-link :to="{ name: 'home' }">
          <h3 class="text-white my-auto">VueJS</h3>        			
        </router-link>
      </div>

      <div class="col-2 col-sm-2">
      </div>

      <div class="col-6 col-sm-6 py-3 px-0">
        <div class="input-group border rounded">
          <div class="container">
            <div class="row">
              
              <div class="input-group-prepend col-4 col-sm-4 px-0"> 
                <select v-model.number="category_search" class="w-100 bg-info text-white">
                      <option v-for="(category, index) in categories" :key="index" :value="index"> {{category}} </option>
                </select>
              </div>
          
              <input class="search-bar col-6 col-sm-6" v-model="product_search" placeholder="Rechercher un produit"/>

              <div class="input-group-append col-1 col-sm-1">
                  <a href="#" @click='searchProducts()'> <i class="fa fa-search fa-2x text-white px-2 h-100 w-100" aria-hidden="true"></i> </a>
              </div>

            </div>
          </div>
          
          </div>

      </div>

      <div class="col-2 col-sm-2">
          <div class="dropdown show">
            <a class="btn bg-white text-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{user_name}}
            </a>

            <div class="dropdown-menu bg-white text-dark" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item text-dark" href="#" @click='logout()'> <i class="fas fa-chevron-right"></i> Deconnexion </a>
            </div>

          </div>
      </div>

      	 <div class="col-1 col-sm-1">
            <div class="row">
              <router-link :to="{ name: 'cart_index', params: { id: user_id } }">

                  <div class="col-12 col-sm-12 text-white card_number">
                      <h4> {{cart_number}} </h4>
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
      category_search: (navbarStore.getters.categorysearch != null ? navbarStore.getters.categorysearch : 0),
      product_search: navbarStore.getters.productsearch,
      cart_number: null,
      categories: { 0: 'Toutes les categories', 1 : 'Informatique',2 :'Mobilier', 3 : 'Mode', 4: 'Auto & Moto', 5: 'Cuisine'},
      categories1: [],
      categories11: [],
      user_id: userStore.getters.userid,
      user_name: userStore.getters.username,
    }
  },
  beforeMount: function(){
    this.getCartNumber(this.user_id)
    this.getCategories()
    this.fillCategories()  
  },
  methods : {
    getCartNumber: function(id){
      console.log('call getCartNumber')
      var url = process.env.VUE_APP_API_URL_CART_NUMBER + id 
      axios.get(url).
        then((response) => {
          //console.log(response)
          this.cart_number = response.data
      })
    },
    getCategories: function(){
      console.log('call getCategories')
      var url = process.env.VUE_APP_API_URL_CATEGORY_INDEX_PAGE
      axios.get(url).
        then((response) => {
          //console.log(response)
          this.categories1 = response.data
        })
    },
    fillCategories: function(){
        console.log('call fillCategories')
        for(var i= 0; i < this.categories1.length; i++){
          this.categories11[this.categories1[i].id] = this.categories1[i].name
        }
        //console.log(this.categories11)
    },
    searchProducts: function() {

      console.log('category = ' + this.category_search)
      console.log('product = ' + this.product_search)

      this.product_search = (this.product_search != '' ? this.product_search: null)

      navbarStore.commit('setcategory',this.category_search)
      navbarStore.commit('setproduct',this.product_search)

      console.log("Route Name = " + router.currentRoute.name)
      
      if(router.currentRoute.name == 'product_index'){
        router.go()
      }else{
        router.push('product')
      }



    },
    logout: function(){

      userStore.commit('setuserid',null)
      userStore.commit('setuseremail',null)
      userStore.commit('setuserconnected',false)
      userStore.commit('setuserinfosconnexion',null)

      //local storage
      //localStorage.setItem("user", JSON.stringify(userStore.getters.all)) automatic with vuex-persist

      router.push('login')

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
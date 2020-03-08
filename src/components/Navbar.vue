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
              
              <div class="input-group-prepend col-3 col-sm-3 px-0"> 
                <select v-model="selected" class="w-100 bg-info text-white">
                  <option>Toutes categories</option>
                  <option>AAAAA</option>
                  <option>BBBBB</option>
                  <option>CCCCC</option>
                </select>
              </div>
          
              <input class="search-bar col-8 col-sm-8" v-model="product_search" placeholder="Rechercher un produit"/>

              <div class="input-group-append col-1 col-sm-1">
                <a href="#"> <!-- <i class="fa fa-search fa-2x text-white py-1" aria-hidden="true"></i> --> </a>
              </div>

            </div>
          </div>
          
          </div>

      </div>

      <div class="col-2 col-sm-2">
          <div class="dropdown show">
            <a class="btn bg-white text-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              username
            </a>

            <div class="dropdown-menu bg-white text-dark" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item text-dark" href="/login"> <i class="fas fa-chevron-right"></i> Connexion </a>
              <a class="dropdown-item text-dark" href="/product"> <i class="fas fa-chevron-right"></i> Produits </a>
              <a class="dropdown-item text-dark" href="/counter"> <i class="fas fa-chevron-right"></i> Counter </a>
              <a class="dropdown-item text-dark" href="/alert"> <i class="fas fa-chevron-right"></i> Alert </a>
              <a class="dropdown-item text-dark" href="#"> <i class="fas fa-chevron-right"></i> Deconnexion </a>
            </div>

          </div>
      </div>

      	 <div class="col-1 col-sm-1">
            <div class="row">
                  <div class="col-12 col-sm-12 text-white card_number">
                      <h4> {{cart_number}} </h4>
                  </div>

                  <div class="col-12 col-sm-12 card_shop">
                    <i class="fas fa-shopping-cart fa-3x text-white"></i>
                  </div>

                </div>
        </div>


    </div>
  </div>

</template>

<script>
import axios from 'axios'
import cartStore from '../store/CartStore'

export default {

  store: cartStore,

  data() {
    return {
      selected: "Toutes categories",
      product_search: "",
      cart_number: 0,
      user_id: 6,
    }
  },
  mounted: function(){
    this.getCartNumber(this.user_id)
  },
  methods : {
      getCartNumber: function(id){
        var url = process.env.VUE_APP_API_URL_CART_NUMBER + id 
        axios.get(url).
          then((response) => {
            console.log(response)
            this.cart_number = response.data
        })
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
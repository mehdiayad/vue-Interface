<template>

  <div class="container-fluid ">
    <div class="row bg-dark align-items-center">
      
      <div class="col-12 col-sm-12 text-center alert-danger danger">
          <div class="h5 py-1 my-0"> Durée de la session : {{sessionTimeRemaining}} </div>      			
      </div>
      
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
              
              <div class="input-group-prepend col-4 col-sm-4 m-0 p-0 border-0"> 
                <select v-model.number="categorySearch" class="w-100 bg-info text-white">
                      <option v-for="(category, index) in categories" :key="index" :value="index"> {{category}} </option>
                </select>
              </div>
          
              <input class="search-bar col-6 col-sm-6 m-0 pl-3 border-0" v-model="productSearch" placeholder="Rechercher un produit"/>

              <div class="input-group-append col-2 col-sm-2 m-0 p-0 border-0">
                  <a class="btn py-0 mx-0 px-0 bg-info w-100" @click='searchProducts()'> <i class="fa fa-search fa-2x text-white px-2" aria-hidden="true"></i> </a>
              </div>

            </div>
          </div>          
        </div>
      </div>

      <div class="col-2 col-sm-2">
          <div class="dropdown show">
            <a class="btn bg-white text-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{user.userName}}
            </a>

            <div class="dropdown-menu bg-white text-dark" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item text-dark btn" @click='showAccount()'> <i class="fas fa-chevron-right"></i> Mon compte </a>
              <a class="dropdown-item text-dark btn" @click='logout()'> <i class="fas fa-chevron-right"></i> Deconnexion </a>
            </div>

          </div>
      </div>

      	 <div class="col-1 col-sm-1">
            <div class="row">
              <router-link :to="{ name: 'cart_index', params: { id: user.userId } }">

                  <div class="col-12 col-sm-12 text-white card_number">
                      <h4> {{cartNumber}} </h4>
                  </div>

                  <div class="col-12 col-sm-12 card_shop">
                    <router-link :to="{ name: 'cart_index'}" style="text-decoration:none;">
                      <i class="fas fa-shopping-cart fa-3x text-white"></i>
                    </router-link>
                  </div>
              </router-link>
            </div>
        </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-info text-white">
              <h5 class="modal-title" id="exampleModalLabel">Informations</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <div class="container-fluid">

                <div class="form-group row">
                    <div class="col-4 col-sm-4">Identifiant</div>
                    <div class="col-1 col-sm-1"> </div>
                    <input class="col-7 col-sm-7 bg-light border rounded" disabled v-model="user.userId">
                </div>

                <div class="form-group row">
                    <div class="col-4 col-sm-4">Nom</div>
                    <div class="col-1 col-sm-1"> </div>
                    <input class="col-7 col-sm-7 border rounded" v-model="userNameModal">
                </div>

                <div class="form-group row">
                    <div class="col-4 col-sm-4">Email</div>
                    <div class="col-1 col-sm-1"> </div>
                    <input class="col-7 col-sm-7 bg-light border rounded" disabled v-model="user.userEmail">
                </div>

                <div class="form-group row">
                    <div class="col-4 col-sm-4">Clé d'acces</div>
                    <div class="col-1 col-sm-1"> </div>
                    <input class="col-7 col-sm-7 bg-light border rounded" disabled v-model="user.userTokenAccess">
                </div>

                <div class="form-group row">
                    <div class="col-4 col-sm-4">Date d'expiration</div>
                    <div class="col-1 col-sm-1"> </div>
                    <input class="col-7 col-sm-7 bg-light border rounded" disabled v-model="user.userTokenExpiresAt">
                </div>
                    
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
              <button type="button" @click="saveUser()" class="btn btn-info">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


export default {

  data() {
    return {
      categorySearch: navbarStore.getters.getCategorySearch,
      productSearch: navbarStore.getters.getProductSearch,
      userNameModal: userStore.getters.getUserName,
    }
  },
  computed:{
    categories() {
      return navbarStore.getters.getCategories
    },
    cartNumber() {
      return navbarStore.getters.getCartNumber
    },
    sessionTimeRemaining(){
      return this.msToTime(sessionStore.getters.getSessionTimeRemaining)
    }
  },
  mounted() {
    this.getCategories()
    this.getCartNumber()
  },
  methods : {
    getCategories(){
      let url = process.env.VUE_APP_API_BASE_URL + 'category'
      axios.get(url)
        .then((response) => {
          //console.log(response.data)
          var categoryTemp1 = response.data
          this.fillCategories(categoryTemp1)
        })
        .catch( (error) => {
          console.log('ERROR : ' +  error)
        })
    },
    fillCategories(categoryTemp1){
      let categoryTemp2 = []
      categoryTemp2[0 ]= 'Toutes les categories'
      for(let i= 0; i < categoryTemp1.length; i++){
        categoryTemp2[categoryTemp1[i].id] = categoryTemp1[i].name
      }
      navbarStore.commit('setCategories',categoryTemp2)

    },
    searchProducts() {
      navbarStore.commit('setCategorySearch',this.categorySearch)
      navbarStore.commit('setProductSearch',this.productSearch)
      componentsStore.commit('setKeyProductIndex',1)
      if(router.currentRoute.name == 'product_index'){
        router.go()
      }else{
        router.push({ name: 'product_index'})
      }
    },
    getCartNumber(){
      let url = process.env.VUE_APP_API_BASE_URL + 'cart/number'
      axios.get(url).
        then((response) => {
          //console.log(response)
          var number = response.data
          navbarStore.commit('setCartNumber',number)
      })
      .catch( (error) => {
        console.log('ERROR : ' +  error)
      })
    },	
    logout(){
      userStore.commit('logout')
      sessionStore.commit('logout')
    },
    goHomePage(){

      // instant change data, view reactive, no need page to reload
      this.categorySearch = 0 
      this.productSearch = null 

      // save change in case page reload
      navbarStore.commit('setProductSearch',null)
      navbarStore.commit('setCategorySearch',0)

      if(router.currentRoute.name == 'home'){
        router.go()
      }else{
        router.push({ name: 'home'})
      }
    },
    showAccount(){
      $('#exampleModal').modal('show');
    },
    saveUser(){
      if(this.userNameModal == userStore.getters.getUserName){
        $('#exampleModal').modal('hide');
      }else{
        let url = process.env.VUE_APP_API_BASE_URL + 'user/' + userStore.getters.getUserId
        axios({
          method: 'put',
          url : url,
          data : {name : this.userNameModal, email: userStore.getters.getUserEmail}
        })
        .then((response) => {
            //console.log(response)
            if(response.data){
              userStore.commit('setUserName',this.userNameModal)
              $('#exampleModal').modal('hide');
            }
        })
        .catch( (error) => {
          console.log('ERROR : ' +  error)
        })
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
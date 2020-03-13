<template>

  <div class="container-fluid">

    <div class="row pt-2">
      <div class="col-5 col-sm-5 mx-auto mt-5">
        <div class="card mx-auto text-left">
          <div class="card-header bg-info text-white"> Connexion SIMPLE</div>
          <div class="card-body">
            <div class="form-group">
              <div> Email </div>
              <input v-model="email1" type="email" class="form-control"/>
            </div>
            <div class="form-group">
              <div> Mot de passe </div>
              <input v-model="password1" type="password" class="form-control"/>
            </div>
            <div class="text-center">
              <a class="float-right btn btn-info text-white" v-on:click="loginSimple()">Valider</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt-2">
      <div class="col-5 col-sm-5 mx-auto mt-5">        
        <div class="card mx-auto text-left">
          <div class="card-header bg-info text-white"> Connexion PASSPORT</div>
          <div class="card-body">
            <div class="form-group">
              <div> Nom  </div>
              <input v-model="name2" type="text" class="form-control"/>
            </div>
            <div class="form-group">
              <div> Mot de passe </div>
              <input v-model="password2" type="password" class="form-control"/>
            </div>
            <div class="text-center">
              <a class="float-right btn btn-info text-white" v-on:click="loginPassport()">Valider</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

import axios from 'axios'
import router from '../router/index'
import userStore from '../store/userStore'


  export default {
  data() {
    return {
      email1: userStore.getters.getUserEmail,
      password1: null,
      name2: userStore.getters.getUserName,
      password2: null,
    }
  },
  methods:{
    loginSimple:  function() {
      console.log('[V]LOGINS [M]LOGIN [S]ENTER')
      var url = process.env.VUE_APP_API_URL_AUTHENTIFICATION_SIMPLE
      axios({
        method: 'post',
        url : url,
        data : {email : this.email1, password: this.password1}
      })
      .then(function (response) {
            //console.log(response)
            userStore.commit('setUserId',response.data.userId)
            userStore.commit('setUserEmail',response.data.userEmail)
            userStore.commit('setUserName',response.data.userName)
            userStore.commit('setUserConnected',response.data.userConnected)
            userStore.commit('setUserInformations',response.data.userInformations)
            
            if(userStore.getters.getUserConnected){
              router.push({ name: 'home' })
            }
        })
        .catch(function (error) {
          console.log('[V]LOGIN [M]LOGIN [S]ERROR')
      });
    },
    loginPassport:  function() {
      console.log('[V]LOGINP [M]LOGIN [S]ENTER')
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION_PASSPORT
      console.log('[URL = '+ url1)
      
      axios({
        method: 'post',
        url : url1,
        data : {username : this.name2, password: this.password2, url: url1}
      })
      .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
          console.log('[V]LOGIN [M]LOGIN [S]ERROR')
      });
    },
    getCartNumber: function(id){
      console.log('[V]LOGIN [M]GETCARTNUMBER [S]ENTER')
      var url = process.env.VUE_APP_API_URL_CART_NUMBER + id 
      axios.get(url).
        then((response) => {
          //console.log(response)
          var number = response.data
          navbarStore.commit('setCartNumber',number)
      })
      .catch(function (error) {
          console.log('[V]LOGIN [M]GETCARTNUMBER [S]ERROR')
      })
    },
  }
}
</script>


<style scoped>
</style>


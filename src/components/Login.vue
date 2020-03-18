<template>

  <div class="container-fluid">

    <div class="row pt-2" v-show="false">
      <div class="col-5 col-sm-5 mx-auto mt-5">
        <div class="card mx-auto text-left">
          <div class="card-header bg-info text-white"> Connexion SIMPLE</div>
          <div class="card-body">
            <div class="form-group">
              <div> Email </div>
              <input v-model="email" type="email" class="form-control"/>
            </div>
            <div class="form-group">
              <div> Mot de passe </div>
              <input v-model="password" type="password" class="form-control"/>
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
          <div class="card-header bg-info text-white"> Connexion</div>
          <div class="card-body">
            <div class="form-group">
              <div> Email  </div>
              <input v-model="email" type="text" class="form-control"/>
            </div>
            <div class="form-group">
              <div> Mot de passe </div>
              <input v-model="password" type="password" class="form-control"/>
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

import userStore from '../store/userStore'

  export default {
  data() {
    return {
      email: userStore.getters.getUserEmail,
      password: null,
    }
  },
  mounted: function(){
    //
  },
  methods:{
    loginPassport:  function() {
      console.log('[V]LOGINP [M]LOGIN [S]ENTER')
      var url = process.env.VUE_APP_API_BASE_URL + 'loginPassport'
      //console.log('[URL = '+ apiURL)
      
      axios({
        method: 'post',
        url: url,
        data : {email : this.email, password: this.password}
      })
      .then(function (response) {
            //console.log(response)
            
            if(response.data.userConnected){

              userStore.commit('setUserId',response.data.userId)
              userStore.commit('setUserEmail',response.data.userEmail)
              userStore.commit('setUserName',response.data.userName)
              userStore.commit('setUserConnected',response.data.userConnected)
              userStore.commit('setUserInformations',response.data.userInformations)
              userStore.commit('setUserTokenType',response.data.token_type)
              userStore.commit('setUserTokenExpire',response.data.expires_in)
              userStore.commit('setUserTokenAccess',response.data.access_token)
              userStore.commit('setUserTokenRefresh',response.data.refresh_token)
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.getters.getUserTokenAccess
              router.push({ name: 'home' })

            }
            else
            {
              console.log('Idenfification Failed')
            }

        })
        .catch(function (error) {
          console.log(error)
      });
    },
    getCartNumber: function(id){
      console.log('[V]LOGIN [M]GETCARTNUMBER [S]ENTER')
      var url = process.env.VUE_APP_API_BASE_URL + 'cart/number'
      
      axios({
          method: 'get',
          url: url,
        })
        then((response) => {
          //console.log(response)
          var number = response.data
          navbarStore.commit('setCartNumber',number)
      })
      .catch(function (error) {
          console.log(error)
      })
    },
  }
}
</script>


<style scoped>
</style>


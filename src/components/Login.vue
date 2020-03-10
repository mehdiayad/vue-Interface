<template>

  <div class="container-fluid">
    <div class="row pt-5">
      <div class="col-5 col-sm-5 mx-auto mt-5">
        <div class="card mx-auto text-left">
          <div class="card-header bg-info text-white"> Connexion </div>
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
              <a class="float-right btn btn-info text-white" v-on:click="login()">Valider</a>
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
      email: null,
      password: null,
    }
  },
  methods:{
    login:  function(){
      console.log('Call login')
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION_API;

      axios({
        method: 'post',
        url : url1,
        data : {email : this.email, password: this.password}
      })
      .then(function (response) {
            console.log(response)

            userStore.commit('setuserid',response.data.id)
            userStore.commit('setuseremail',response.data.email)
            userStore.commit('setusername',response.data.name)
            userStore.commit('setuserconnected',response.data.connected)
            userStore.commit('setuserinfosconnexion',response.data.infosconnexion)

            if(response.data.connected){
              // localStorage.setItem("user", JSON.stringify(store.getters.all)) automatic with VuexPersist
              router.push({ name: 'home' })
            }

        });
    }
  }
}
</script>


<style scoped>
</style>


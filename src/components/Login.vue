<template>

  <div class="container-fluid">
    <div class="row pt-5">
      <div class="col-4 col-sm-4 mx-auto mt-5">
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
              <a class="float-left btn btn-info text-white" v-on:click="loginGet1()">GET UI </a>
              <a class="float-right btn btn-info text-white" v-on:click="loginGet2()">GET PASSPORT</a>
            </div>
            <br/><br/><br/>
            <div class="text-center">
              <a class="float-left btn btn-info text-white" v-on:click="loginPost1()">POST UI </a>
              <a class="float-right btn btn-info text-white" v-on:click="loginPost2()">POST PASSPORT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import axios from 'axios'

  export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods:{

    loginGet1(){
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION_UI;
      console.log(url1)

      axios({
        method: 'get',
        url : url1,
      })
      .then(function (response) {
            console.log(response);
        });
    },
    loginGet2(){
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION_PASSPORT;
      console.log(url1)

      axios({
        method: 'get',
        url : url1,
      })
      .then(function (response) {
          console.log(response);
      });
    },
    loginPost1(){
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION_UI;
      console.log(url1)

      axios({
        method: 'post',
        url : url1,
        data: {firstName: 'Fred',lastName: 'Flintstone'}      
        })
        .then(function (response) {
            console.log(response);
        });
    },
    loginPost2(){
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION_PASSPORT;
      console.log(url1)

      axios({
        method: 'post',
        url : url1,
        data: {firstName: 'Fred',lastName: 'Flintstone'}      
        })
        .then(function (response) {
            console.log(response);
        });
    }


  }
}
</script>


<style scoped>
</style>


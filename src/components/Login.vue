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
            <a class="float-left btn btn-info text-white" v-on:click="loginGet()">GET</a>
            <a class="float-right btn btn-info text-white" v-on:click="loginPost()">POST</a>
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

    loginGet(){
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION;
      console.log("Test 1");
      console.log(url1)

			axios.get(url1)
        .then(function (response) {
            console.log(response);
        });
    },
    loginPost(){
      var url1 = process.env.VUE_APP_API_URL_AUTHENTIFICATION;
      console.log("Test 1");
      console.log(url1)

      axios({
        method: 'post',
        url : url1,
        data: {firstName: 'Fred', lastName: 'Flintstone' }
      })
      .then(function (response) {
          console.log(response);
      });
    }


  }
}
</script>



<style></style>


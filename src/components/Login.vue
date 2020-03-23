<template>

  <div class="container-fluid">
    <div class="row pt-2">
      <div class="col-8 col-sm-8 mx-auto mt-5" style="max-width: 600px;">        
        <div class="card mx-auto text-left">
          <div class="card-header bg-info text-white"> Connexion </div>
          <div class="card-body">
            <form role="form">
                <div class="form-group row text-center">
                  <div class="col-6 col-sm-6">
                    <input type="radio" id="grant" value="grant" v-model="loginForm.passport.mode">
                    <label for="grant" class="pl-1">Acces generique</label>
                  </div>
                  <div class="col-6 col-sm-6">
                    <input type="radio" id="client" value="client" v-model="loginForm.passport.mode">
                    <label for="client" class="pl-1">Acces client</label>
                  </div>
                </div>
              <div class="form-group">
                <div> Email  </div>
                <input v-model="loginForm.data.email" type="email" class="form-control"/>
              </div>
              <div class="form-group" v-if="loginForm.passport.mode=='grant'">
                <div> Mot de passe </div>
                <input v-model="loginForm.data.password" type="password" class="form-control"/>
              </div>

              <div class="form-group" v-if="loginForm.passport.mode=='client'">
                <div> 
                  Code 
                  <a class="btn btn-info p-1 m-1 text-white" @click="generateUrl()"> 
                    Generer le code 
                  </a> 
                </div>
                <input v-model="loginForm.data.code" type="text" class="form-control"/>
              </div>

              <div class="form-group" v-if="loginForm.passport.mode=='personal'">
                <div> Clé d'acces </div>
                <input v-model="loginForm.data.code" type="text" class="form-control"/>
              </div>

              <div class="form-group text-right">
                <a class="btn btn-info text-white px-5" v-on:click="canLogin()">Valider</a>
              </div>
              <div class="form-group text-left alert alert-danger" v-if="displayAlert">
                  <div> Error [{{ loginForm.error.code}}] : {{ loginForm.error.type }} </div>
              </div>
              <div class="form-group text-left alert alert-danger" v-if="displayAlert">
                  <div> {{ loginForm.error.description }} </div>
              </div>
            </form>
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
      loginForm: {
        passport:{
          mode: 'grant',
          link: null
        },
        data: {
          email: userStore.getters.getUserEmail,
          password: userStore.getters.getUserPassword,
          code: null,
          validToken: null
        },
        error: {
          code: null,
          type: null,
          description: null,
          alert: false,
          time: 50000
        }
      }
    }
  },
  computed: {
    displayAlert: function(){
      return this.loginForm.error.alert
    }
  },
  mounted: function(){
    // N/A
  },
  methods:{
    setErrorAlert : function(value){
      var self = this;
			self.loginForm.error.alert = value
			setTimeout(function(){
				self.loginForm.error.alert = !value
      }, this.loginForm.error.time);
    },
    loginSimple: function() {
      //console.log('Call 2')
      var url = process.env.VUE_APP_API_BASE_URL + 'passportAuthSimple'
      //inside axios (this) is lost so we save it in order to use it inside the function
      var self = this;      
      axios({
        method: 'post',
        url: url,
        data: self.loginForm.data
      })
      .then(function (response) {
            //console.log(response)
            if(response.data.userConnected){
              userStore.commit('setUserConnected',response.data.userConnected)
              userStore.commit('setUserInformations',response.data.userInformations)
              router.push({ name: 'home' })
            }
            else
            {
              self.loginForm.error.code = response.data.errorCode
              self.loginForm.error.type = response.data.errorType
              self.loginForm.error.description = response.data.errorDescription
              self.setErrorAlert(true)
            }
        })
        .catch(function (error) {
          console.log(error)
          self.loginForm.error.code = 500
          self.loginForm.error.type = "network_error"
          self.loginForm.error.description = error
          self.setErrorAlert(true)
      });
    },
    loginPassport: function() {
      //console.log('Call 2')
      var url = process.env.VUE_APP_API_BASE_URL + 'passportAuthGrant'
      if(this.loginForm.passport.mode == 'client'){
        url = process.env.VUE_APP_API_BASE_URL + 'passportAuthClient'
      }
      //inside axios (this) is lost so we save it in order to use it inside the function
      var self = this;      
      axios({
        method: 'post',
        url: url,
        data: this.loginForm.data
      })
      .then(function (response) {
            //console.log(response)
            if(response.data.userConnected){
              userStore.commit('setUserEmail',self.loginForm.data.email)
              userStore.commit('setUserPassword',self.loginForm.data.password)
              userStore.commit('setUserId',response.data.userId)
              userStore.commit('setUserName',response.data.userName)
              userStore.commit('setUserConnected',response.data.userConnected)
              userStore.commit('setUserInformations',response.data.userInformations)
              userStore.commit('setUserTokenType',response.data.tokenType)
              userStore.commit('setUserTokenExpiresIn',response.data.expiresIn)
              userStore.commit('setUserTokenExpiresAt',response.data.expiresAt)
              userStore.commit('setUserTokenCreatedAt',response.data.createdAt)
              userStore.commit('setUserTokenAccess',response.data.accessToken)
              userStore.commit('setUserTokenRefresh',response.data.refreshToken)
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.getters.getUserTokenAccess
              router.push({ name: 'home' })
            }
            else
            {
              self.loginForm.error.code = response.data.errorCode
              self.loginForm.error.type = response.data.errorType
              self.loginForm.error.description = response.data.errorDescription
              self.setErrorAlert(true)
            }
        })
        .catch(function (error) {
          console.log(error)
          self.loginForm.error.code = 500
          self.loginForm.error.type = "network_error"
          self.loginForm.error.description = error
          self.setErrorAlert(true)
      });
    },
    generateUrl: function($event){
      var url = process.env.VUE_APP_API_BASE_URL + 'passportGenerateAuthorizeUrl'
      var self = this
       axios({
        method: 'post',
        url: url,
        data: this.loginForm.data
      })
      .then(function (response) {
            //console.log(response)
            if(response.data.errorCode==null){
              self.loginForm.passport.link = response.data.apiUrl
              window.open(self.loginForm.passport.link, "_blank");
            }else{
              self.loginForm.error.code = response.data.errorCode
              self.loginForm.error.type = response.data.errorType
              self.loginForm.error.description = response.data.errorDescription
              self.setErrorAlert(true)
            }
      })
       .catch(function (error) {
          console.log(error)
       });
    },
    testToken : function(){
      //console.log('Call 1')
      var self = this
      var url = process.env.VUE_APP_API_BASE_URL + 'passportTestToken'
      return new Promise(function(resolve,reject){
        axios({
          method: 'get',
          url: url,
        })
        .then(function (response) {
          //console.log(response)
          //console.log('Call 11')
          self.loginForm.data.validToken = true
          resolve('success')
        })
        .catch(function (error) {
          console.log(error)
          //console.log('Call 11')
          self.loginForm.data.validToken = false
          resolve('faillure')
        });
      });
    },
    canLogin: function(){
      var canCall = false
      if(this.loginForm.passport.mode == "grant" && this.loginForm.data.email != null && this.loginForm.data.password != null && this.loginForm.data.email.length >0 && this.loginForm.data.password.length >0){
        canCall = true
      }
      if(this.loginForm.passport.mode == "client" && this.loginForm.data.email != null && this.loginForm.data.code != null && this.loginForm.data.email.length >0 && this.loginForm.data.code.length >0){
        canCall = true
      }
      if(canCall == true){
        this.dologin()
      }else{
        window.alert("Veuillez remplir tous les champs avant de cliquer sur valider");
      }
    },
    dologin: async function (){
      // first call function
      await this.testToken()
      // second call function
      if(this.loginForm.data.validToken){
        if(this.loginForm.passport.mode == 'grant' && userStore.getters.getUserEmail == this.loginForm.data.email){
          this.loginSimple()
        }else{
          this.loginPassport()
        }
      }else{
        this.loginPassport()
      }
    }
  }
}
</script>


<style scoped></style>


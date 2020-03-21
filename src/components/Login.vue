<template>

  <div class="container-fluid">

    <div class="row pt-2">
      <div class="col-8 col-sm-8 mx-auto mt-5" style="max-width: 600px;">        
        <div class="card mx-auto text-left">
          <div class="card-header bg-info text-white"> Connexion </div>
          <div class="card-body">
            <form role="form">
                <div class="form-group row text-center">
                  <div class="col-4 col-sm-4">
                    <input type="radio" id="grant" value="grant" v-model="loginForm.passport.mode">
                    <label for="grant" class="pl-1">Acces generique</label>
                  </div>
                  <div class="col-4 col-sm-4">
                    <input type="radio" id="client" value="client" v-model="loginForm.passport.mode">
                    <label for="client" class="pl-1">Acces client</label>
                  </div>
                  <div class="col-4 col-sm-4">
                    <input type="radio" id="personal" value="personal" v-model="loginForm.passport.mode">
                    <label for="personal" class="pl-1">Acces personnel</label>
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
                  <a class="btn btn-info p-1 m-1 text-white" @click="generateUrl()"> Generer le lien </a> 
                  <a class="btn btn-info p-1 m-1 text-white" v-if="(loginForm.passport.link!=null)"  :href="loginForm.passport.link" target="_blank"> Generer le code </a> 
                </div>
                <input v-model="loginForm.data.code" type="text" class="form-control"/>
              </div>

              <div class="form-group" v-if="loginForm.passport.mode=='personal'">
                <div> Code </div>
                <input v-model="loginForm.data.code" type="text" class="form-control"/>
              </div>

              <div class="form-group text-right">
                <a class="btn btn-info text-white px-5" v-on:click="loginPassport()">Valider</a>
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
          code: null
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
    //console.log(this.user)
  },
  methods:{
    setErrorAlert : function(value){
      var self = this;
			self.loginForm.error.alert = value
			setTimeout(function(){
				self.loginForm.error.alert = !value
      }, this.loginForm.error.time);
    },
    loginPassport:  function() {

      var url = null
      if(this.loginForm.passport.mode == 'grant'){
        url = process.env.VUE_APP_API_BASE_URL + 'loginPassportGrant'
      }else if(this.loginForm.passport.mode == 'client'){
        url = process.env.VUE_APP_API_BASE_URL + 'loginPassportClient'
      } else{
        url = process.env.VUE_APP_API_BASE_URL + 'loginPassportPersonal'
      }
      
      //inside axios (this) is lost so we save it in order to use it inside the function
      var self = this;      
      axios({
        method: 'post',
        url: url,
        data: this.loginForm.data
      })
      .then(function (response) {
            console.log(response)
            if(response.data.userConnected){
              userStore.commit('setUserEmail',self.loginForm.data.email)
              userStore.commit('setUserPassword',self.loginForm.data.password)
              userStore.commit('setUserId',response.data.userId)
              userStore.commit('setUserName',response.data.userName)
              userStore.commit('setUserConnected',response.data.userConnected)
              userStore.commit('setUserInformations',response.data.userInformations)
              userStore.commit('setUserTokenType',response.data.tokenType)
              userStore.commit('setUserTokenExpire',response.data.expiresIn)
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
    generateUrl: function(){

      var url = process.env.VUE_APP_API_BASE_URL + 'generateAuthorizeUrl'
      var self = this
       axios({
        method: 'post',
        url: url,
        data: this.loginForm.data
      })
      .then(function (response) {
            console.log(response)

            if(response.data.errorCode==null){
              
              self.loginForm.passport.link = response.data.apiUrl

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

    }
  }
}
</script>


<style scoped></style>


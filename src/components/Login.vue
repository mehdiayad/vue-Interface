<template>

  <div class="container-fluid">

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
            <div class="form-group text-right">
              <a class="btn btn-info text-white w-50" v-on:click="loginPassport()">Valider</a>
            </div>
            <div class="form-group text-left alert alert-danger" v-if="displayAlert">
                <div> Les identifiants sont incorrects </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

//import userStore from '../store/userStore'
//import navbarStore from '../store/navbarStore'

  export default {
  data() {
    return {
      email: userStore.getters.getUserEmail,
      password: userStore.getters.getUserPassword,
      alertAuth: false
    }
  },
  computed: {
    displayAlert: function(){
      console.log('Call display Alert')
      return this.alertAuth
    }
  },
  mounted: function(){
    // nothing to do
  },
  methods:{
    setAlertAuth : function(value){
      var self = this;
			self.alertAuth = value
			setTimeout(function(){
				self.alertAuth = !value
      }, 2000);
    },
    loginPassport:  function() {
      var url = process.env.VUE_APP_API_BASE_URL + 'loginPassport'
      
      //inside axios (this) is lost so we save it in order to use it inside the function
      var self = this;
      
      axios({
        method: 'post',
        url: url,
        data : {email : this.email, password: this.password}
      })
      .then(function (response) {

            console.log(response)

            if(response.data.userConnected){
              
              //console.log('Email2 = '+ this.email) this not working
              //console.log('Password2 = '+ this.password) this not working
              userStore.commit('setUserEmail',self.email)
              userStore.commit('setUserPassword',self.password)
              userStore.commit('setUserId',response.data.userId)
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
              self.setAlertAuth(true)
            }

        })
        .catch(function (error) {
          console.log(error)
          self.setAlertAuth(true)
      });
    }
  }
}
</script>


<style scoped>
</style>


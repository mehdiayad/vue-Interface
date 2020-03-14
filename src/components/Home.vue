<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-sm-12">
        <img class="home_img w-100" alt="home image " src="/images/home_overview.jpg">
      </div>
    </div>
  </div>
</template>



<script>

import axios from 'axios'
import navbarStore from '../store/navbarStore'
import userStore from '../store/userStore'


export default {

  mounted: function() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.getters.getUserTokenAccess;
    console.log(axios.defaults.headers.common['Authorization'])
    this.getCartNumber(userStore.getters.getUserId)
	},
  	methods: {
      getCartNumber: function(id){
        //console.log('[Home.VUE] [GETCARTNUMBER] START')
      	var url = process.env.VUE_APP_API_BASE_URL + 'cart/number/' + id
        
        axios.get(url).
          then((response) => {
            //console.log(response)
            var number = response.data
            navbarStore.commit('setCartNumber',number)
        })
        .catch(function (error) {
          console.log('[GetCartNumber] ERROR : ' +  error)
        })
      }		
	}
}
</script>

<style scoped>

.home_img{
  height: 600px;
}
</style>


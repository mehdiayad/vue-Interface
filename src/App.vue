<template>

  <div id="app" class="m-0 p-0">
    <div class="container-fluid" >
      <div class="row">
        
        <div v-if="isLoginPage()" class="col-12 col-sm-12 px-0">
          <navbar></navbar>
        </div>

        <div class="router_view col-12 col-sm-12 px-0 text-center">
            <router-view></router-view>
        </div>

		    <div v-if="isLoginPage()" class="col-12 col-sm-12 px-0">
          <footbar></footbar>
        </div>
        
      </div>
    </div>
  </div>

</template> 

<script>

import navbar  from './components/Navbar'
import footbar from './components/Footbar'

export default {
  components: { 
   navbar,footbar
  },
  mounted(){
	  // N/A
  },
  methods:{
    isLoginPage() {
      return(this.$route.name !== "login")
    }
  }
}
</script>

<style>

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px)
{
	body
	{
		background-color:white;
	} 
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px)
{
	body
	{
		background-color:white;
	} 

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px)
{
	body
	{
		background-color:white;
	} 
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px)
{
	body
	{
		background-color:white;
	} 
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px)
{
	body
	{
		background-color:white;
	} 
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router_view{
  min-height: 650px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
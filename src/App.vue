<template>

  <div id="app" class="m-0 p-0">
    <div class="container-fluid" >
      <div class="row">
        
        <div v-show="displayNavbar()" class="col-12 col-sm-12 px-0">
          <navbar></navbar>
        </div>

        <div class="dynamic-component col-12 col-sm-12 px-0 text-center">
            <router-view></router-view>
        </div>

		    <div v-show="displayFootbar()" class="col-12 col-sm-12 px-0">
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
  methods:{
	  displayNavbar() {
		  if(this.$route.name == "hello")
	        return false;
		  else
		  	return true;
	    },
	    displayFootbar() {
			  if(this.$route.name == "hello")
		        return false;
			  else
			  	return true;
	    }
  }
}
</script>

<style>

#app 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-width: 1000px;
}

.dynamic-component{
  min-height: 650px;
}

</style>
<template>

  <div id="app2" class="m-0 p-0">
    <div class="container-fluid" >
      <div class="row">
        
        <div class="col-12 col-sm-12 px-0">
          <navbar></navbar>
        </div>

        <div class="col-12 col-sm-12 px-0 text-center">
            <router-view></router-view>
        </div>

      </div>
    </div>
  </div>

</template> 

<script>

import navbar   from './components/Navbar'

export default {
  components: { 
   navbar
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

</style>
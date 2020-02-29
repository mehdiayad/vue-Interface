<template>

  <div id="app" class="m-0 p-0">
    <div class="container-fluid" >
      <div class="row d-flex align-items-stretch" style="min-height:800px;">
        
        <div class="col-12 col-sm-12 px-0">
          <navbar></navbar>
        </div>

        <div class="col-12 col-sm-12 px-0">
          <search></search>
        </div>

      </div>
    </div>
  </div>

</template>

<script>

import navbar   from './components/Navbar'
import search  from './components/Search'

export default {
  components: { 
   navbar, search
  }
}
</script>

<style src="./css/style.css"> </style>
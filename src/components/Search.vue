<template>
  <div>
    <h1>Get data from API</h1>
  </div>
</template>


<script>
import axios from 'axios'


export default {
  name: 'search',
  mounted: function() {
      axios.get("http://localhost:8888/Laravel-WS/public/product")
        .then(response => console.log(response));
        
  }
}
</script>

<style>
</style>
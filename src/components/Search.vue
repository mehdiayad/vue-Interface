<template>

</template>


<script>
import axios from 'axios'

export default {
  mounted: function() {
      axios.get("http://localhost:8888/Laravel6-WS/public/product")
        .then(response => console.log(response));
  }
}
</script>

<style>
</style>
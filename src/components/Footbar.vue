<template>

  <div class="container-fluid bg-dark">
	<h4 class="text-center text-white p-3"> Version [ {{ appVersion}} ]</h4>
  </div>

</template>

<script> 
export default {
  	data () {
	    return {
			appVersion: "1.4-SNAPSHOT",
	      }
    }
}
</script>

<style scoped>
</style>
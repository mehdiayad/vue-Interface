<template>

  <div class="container-fluid bg-info">
	<h4 class="text-center text-white p-3"> Version [ {{ version_app}} ]</h4>
  </div>

</template>

<script> 
export default {
  	data () {
	    return {
			version_app: "1.0.0-SNAPSHOT",
	      }
    }
}
</script>

<style scoped>
</style>
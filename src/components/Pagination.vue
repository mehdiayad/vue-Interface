<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-4 col-sm-4 mx-auto text-white mt-3 mb-3">

				<span v-if="canGoBefore()"> <a class="btn btn-info mx-1" v-on:click="previousPage()"> Precedent </a> </span>
				<span v-else> <a class="btn btn-info disabled mx-1" v-on:click="previousPage()"> Precedent </a> </span>
				
				<span class="text text-dark mx-1"> {{ currentPage }} of {{lastPage}} </span>

				<span v-if="canGoAfter()"> <a class="btn btn-info mx-1" v-on:click="nextPage()"> Suivant </a> </span>
				<span v-else> <a class="btn btn-info disabled mx-1" v-on:click="nextPage()"> Suivant </a> </span>

			</div>
		</div>

		<span> <a class="btn btn-info text-white mx-1 mx-auto " v-on:click="displayConsole()"> TEST </a> </span> 

	</div>

</template>


<script>


export default {
  	props : {
			page: Number,
			currentPage: Number,
			lastPage: Number,
			nextPageUrl: String,
			previousPageUrl: String,
    },
  	methods: {
		canGoBefore(){
			if(this.currentPage > 1){ return true }
			else { return false }
		},
		canGoAfter(){
			if(this.currentPage < this.lastPage){ return true }
			else { return false }
		},
		previousPage(){
			if(this.canGoBefore()){
			this.$emit('updatePageValue',-1)
			this.$emit('getProducts',this.page)
			}
		},
		nextPage(){
			if(this.canGoAfter()){
			this.$parent.$emit('updatePageValue',1)
			this.$parent.$emit('getProducts',this.page)
			}
		},
		displayConsole(){
			console.log("Page : " + this.page)
			console.log("Current page : " + this.currentPage)
			console.log("Last page : " + this.lastPage)
			console.log("Previous page : " + this.previousPage)
			console.log("Next Page : " + this.nextPage)
		}
	}
}
</script>


<style>

.product_img{
	width: 200px;
	height: 200px;
}
</style>
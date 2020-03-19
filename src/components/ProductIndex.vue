<template>
	<div class="container-fluid text-left">
		<div v-if="products.data.length>0" class="row">
			<div class="col-4 col-sm-4 mt-3" v-for="product in products.data" v-bind:key="product.id">
				<router-link :to="{ name: 'product_show', params: { id: product.id } }" style="text-decoration:none;">
					<div class="mx-auto h-100 text-left">
						<img class="product_img mx-auto d-block" alt="product img" v-bind:src="getImgUrl(product.img_overview)" /> 
						<h5  class="product_price mt-2"> {{ formatPrice(product.price) }} € </h5>
						<div class="product_desc small"> {{ product.description_title }} </div>
					</div>
				</router-link>
			</div>
		</div>
		<div v-if="products.length>0" class="row">
			<div class="col-4 col-sm-4 mx-auto text-white mt-3 mb-3">
				<span v-if="canGoBefore()"> <a class="btn btn-info text-white mx-1" v-on:click="previousPage()"> Precedent </a> </span>
				<span v-else> <a class="btn btn-info text-white disabled mx-1" v-on:click="previousPage()"> Precedent </a> </span>				
				<span class="text text-dark mx-1"> {{products.currentPage}} of {{products.lastPage}} </span>
				<span v-if="canGoAfter()"> <a class="btn btn-info text-white mx-1" v-on:click="nextPage()"> Suivant </a> </span>
				<span v-else> <a class="btn btn-info text-white disabled mx-1" v-on:click="nextPage()"> Suivant </a> </span>
			</div>
		</div>

		<div v-if="products.length=0" class="row mt-3">
			<h3> Aucun produit ne correspond a votre recherche </h3>
			<h5> Essayez de vérifier votre orthographe ou d’utiliser des termes plus généraux </h5>
		</div>

	</div>
</template>


<script>


export default {
	
  	data () {
	    return {
			products: {
				data: [],
				page: 1,
				totalProducts: null,
				currentPage: null,
				lastPage: null,
				nextPageUrl: null,
				previousPageUrl: null,
			},
			navbarForm: {
				productSearch: navbarStore.getters.getProductSearch,
				categorySearch: navbarStore.getters.getCategorySearch,
				pagination: 10,
			}
	      }
    },
  	mounted: function() {
		this.getProducts(this.products.page)
	},
  	methods: {
		getProducts(page) {
      		var url = process.env.VUE_APP_API_BASE_URL + 'product/list?page=' + page
			axios({
				method: 'post',
				url : url,
				data: this.navbarForm
			})
       		.then((response) => {
				//console.log(response)
				this.products.data = response.data.data
				this.products.page = response.data.current_page
				this.products.totalProducts = response.data.total
				this.products.currentPage = response.data.current_page
				this.products.lastPage = response.data.last_page
				this.products.nextPageUrl = response.data.next_page_url
				this.products.previousPageUrl = response.data.prev_page_url
			})
			.catch(function (error) {
          		console.log(error)
      		});
		},
		canGoBefore(){
			if(this.products.currentPage > 1){ return true; }
			else { return false; }
		},
		canGoAfter(){
			if(this.products.currentPage < this.products.lastPage){ return true; }
			else { return false; }
		},
		previousPage(){
			if(this.canGoBefore()){
			this.products.page--;
			this.getProducts(this.products.page);
			}
		},
		nextPage(){
			if(this.canGoAfter()){
			this.products.page++;
			this.getProducts(this.products.page);
			}
		}
	}
}
</script>

<style scoped>

.product_img{
	width: 200px;
	height: 200px;
}

a {
	color: black;
}

a :hover{
	color: #5bc0de;
}


.product_desc :hover{
	text-decoration: none; 
}

</style>
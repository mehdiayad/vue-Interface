<template>
	<div class="container-fluid text-left">
		<div v-if="products.length>0" class="row">
			<div class="col-4 col-sm-4 mt-3" v-for="product in products" v-bind:key="product.id">
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
				<span class="text text-dark mx-1"> {{productsInfo.currentPage}} of {{productsInfo.lastPage}} </span>
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
			products: [],
			productsInfo: {
				page: 1,
				totalProducts: null,
				currentPage: null,
				lastPage: null,
				nextPageUrl: null,
				previousPageUrl: null,
				pagination: 10,
			},
			productSearch: navbarStore.getters.getProductSearch,
			categorySearch: navbarStore.getters.getCategorySearch,
	      }
    },
  	mounted: function() {
		this.getProducts(this.productsInfo.page)
	},
  	methods: {
		getProducts(page) {
			//console.log('call get products')
      		var url = process.env.VUE_APP_API_BASE_URL + 'product/list?page=' + page
		
			//console.log(url)
			var categorySearchTemp = (this.productsInfo.categorySearch !=0  ? this.productsInfo.categorySearch : null)
			var productSearchTemp = (this.productsInfo.productSearch   !='' ? this.productsInfo.productSearch : null)
			//console.log('Product = '+ productSearchTemp)
			
			axios({
				method: 'post',
				url : url,
				data : {category : categorySearchTemp, product: productSearchTemp, pagination: this.pagination}
			})
       		.then((response) => {
			//console.log(response)
			this.products = response.data.data
			this.productsInfo.page = response.data.current_page
			this.productsInfo.totalProducts = response.data.total
			this.productsInfo.currentPage = response.data.current_page
			this.productsInfo.lastPage = response.data.last_page
			this.productsInfo.nextPageUrl = response.data.next_page_url
			this.productsInfo.previousPageUrl = response.data.prev_page_url
			})
			.catch(function (error) {
          		console.log(error)
      		});
		},
		canGoBefore(){
			if(this.productsInfo.currentPage > 1){ return true; }
			else { return false; }
		},
		canGoAfter(){
			if(this.productsInfo.currentPage < this.productsInfo.lastPage){ return true; }
			else { return false; }
		},
		previousPage(){
			if(this.canGoBefore()){
			this.productsInfo.page--;
			this.getProducts(this.productsInfo.page);
			}
		},
		nextPage(){
			if(this.canGoAfter()){
			this.productsInfo.page++;
			this.getProducts(this.productsInfo.page);
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
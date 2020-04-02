<template>
	<div class="container-fluid text-left" :key="componentKeyProductIndex">
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
		<div v-if="products.data.length>0" class="row">
			<div class="col-4 col-sm-4 mx-auto text-white mt-3 mb-3 text-center">
				<span v-if="canGoBefore()"> <a class="btn btn-info text-white mx-1" :class="isDisabledBefore" @click="previousPage()"> Precedent </a> </span>
				<span class="text text-dark mx-1"> {{products.currentPage}} of {{products.lastPage}} </span>
				<span v-if="canGoAfter()"> <a class="btn btn-info text-white mx-1" :class="isDisabledAfter" @click="nextPage()"> Suivant </a> </span>
			</div>
		</div>

		<div v-if="products.data.length==0" class="mt-3">
			<div class="h3"> Aucun produit ne correspond a votre recherche </div>
			<div class="h5"> Essayez de vérifier votre orthographe ou d’utiliser des termes plus généraux </div>
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
			},
		}
	},
	computed: {
		componentKeyProductIndex(){
			return componentsStore.getters.getKeyProductIndex
		},
		isDisabledBefore(){
			return (this.canGoBefore() === true ? '' : 'disabled')
		},
		isDisabledAfter(){
			return (this.canGoAfter() === true ? '' : 'disabled')
		}
	},
  	mounted() {
		this.getProducts(this.products.page)
	},
  	methods: {
		getProducts(page) {
			//console.log('call function getproducts ')
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
			.catch( (error) => {
          		console.log(error)
      		});
		},
		canGoBefore(){
			return (this.products.currentPage > 1 ? true : false)
		},
		canGoAfter(){
			return (this.products.currentPage < this.products.lastPage ? true : false)
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
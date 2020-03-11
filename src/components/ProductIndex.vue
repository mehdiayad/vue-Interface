<template>
	<div class="container-fluid">
		<div class="row">
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

		<div class="row">
			<div class="col-4 col-sm-4 mx-auto text-white mt-3 mb-3">

				<span v-if="canGoBefore()"> <a class="btn btn-info text-white mx-1" v-on:click="previousPage()"> Precedent </a> </span>
				<span v-else> <a class="btn btn-info text-white disabled mx-1" v-on:click="previousPage()"> Precedent </a> </span>
				
				<span class="text text-dark mx-1"> {{ currentPage }} of {{lastPage}} </span>

				<span v-if="canGoAfter()"> <a class="btn btn-info text-white mx-1" v-on:click="nextPage()"> Suivant </a> </span>
				<span v-else> <a class="btn btn-info text-white disabled mx-1" v-on:click="nextPage()"> Suivant </a> </span>

			</div>

			<!-- <span> <a class="btn btn-info text-white mx-1" v-on:click="displayConsole()"> TEST </a> </span> -->

		</div>

	</div>
</template>


<script>

import axios from 'axios'
import navbarStore from '../store/navbarStore'
//import {functionsMixin} from '../mixins/functionsMixin'

export default {
	
	//mixins: [functionsMixin],
  	data () {
	    return {
			page: 1,
			products: [],
			totalProducts: null,
			currentPage: null,
			lastPage: null,
			nextPageUrl: null,
			previousPageUrl: null,
			product_search: navbarStore.getters.productsearch,
			category_search: navbarStore.getters.categorysearch,
	      }
    },
  	mounted: function() {
		this.getProducts(this.page)
	},
  	methods: {
		getProducts(page) {
			//console.log('call get products')
			var url = process.env.VUE_APP_API_URL_PRODUCT_INDEX_CUSTOM + this.page.toString()
		
			//console.log(url)
			
			axios({
				method: 'post',
				url : url,
				data : {category : this.category_search, product: this.product_search}
			})
       		.then((response) => {
			//console.log(response)
			this.page = response.data.current_page
			this.products = response.data.data
			this.totalProducts = response.data.total
			this.currentPage = response.data.current_page
			this.lastPage = response.data.last_page
			this.nextPageUrl = response.data.next_page_url
			this.previousPageUrl = response.data.prev_page_url
			});
		},
		canGoBefore(){
			if(this.currentPage > 1){ return true; }
			else { return false; }
		},
		canGoAfter(){
			if(this.currentPage < this.lastPage){ return true; }
			else { return false; }
		},
		previousPage(){
			if(this.canGoBefore()){
			this.page--;
			this.getProducts(this.page);
			}
		},
		nextPage(){
			if(this.canGoAfter()){
			this.page++;
			this.getProducts(this.page);
			}
		},
		displayConsole(){
			console.log("Total products : " + this.totalProducts)
			console.log("Current page : " + this.currentPage)
			console.log("Last page : " + this.lastPage)
			console.log("Previous page : " + this.previousPage)
			console.log("Next Page : " + this.nextPage)
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
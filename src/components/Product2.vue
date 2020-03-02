<template>
	<div class="container-fluid">
		
		<div class="row">
			<div class="col-4 col-sm-4 mt-3" v-for="product in products" v-bind:key="product.id">
				<div class="mx-auto h-100 text-left">
					<img class="product_img mx-auto d-block" alt="product img" v-bind:src="getImgUrl(product.img_overview)" /> 
					<h5> {{ formatPrice(product.price) }} € </h5>
					<div class="small"> {{ product.description_title }} </div>
					<div class="small"> {{ product.img_overview }} </div>
				</div>
			</div>
		</div>

		<pagination 
			v-bind:page="page" 
			v-bind:currentPage="currentPage" 
			v-bind:lastPage="lastPage" 
			nextPageUrl="nextPageUrl" 
			previousPageUrl="previousPageUrl"> 
		</pagination>

	</div>
</template>


<script>

import axios from 'axios'
import pagination from './Pagination'

export default {
	components: {
		pagination
	}, 
	data () {
	    return {
			products: [],
			totalProducts: null,
			page: 1,
			currentPage: null,
			lastPage: null,
			nextPageUrl: null,
			previousPageUrl: null,
	      }
    },
  	mounted: function() {
		this.getProducts(this.page)
	},
  	methods: {
		formatPrice(value) {
			let val = (value/1).toFixed(2).replace('.', ',')
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		getImgUrl(img_path) {
			return '/products/'+ img_path
		},
		getProducts(page) {
			var url = process.env.VUE_APP_API_URL_PRODUCT_INDEX_PAGE + this.page.toString()
			   
			axios.get(url)
       		.then((response) => {
			console.log(response)
			this.page = response.data.current_page
			this.products = response.data.data
			this.totalProducts = response.data.total
			this.currentPage = response.data.current_page
			this.lastPage = response.data.last_page
			this.nextPageUrl = response.data.next_page_url
			this.previousPageUrl = response.data.prev_page_url
			})
			
		},
		updatePageValue(value) {
			this.page = this.page + value
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
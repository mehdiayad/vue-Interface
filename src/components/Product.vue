<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-4 col-sm-4 mt-3" v-for="product in products" v-bind:key="product.id">
				<div class="mx-auto h-100 text-left">
					<img class="product_img mx-auto mx-auto d-block" alt="product img" v-bind:src="getImgUrl(product.img_overview)" /> 
					<h5> {{ formatPrice(product.price) }} € </h5>
					<div class="small"> {{ product.description_title }} </div>
					<div class="small"> {{ product.img_overview }} </div>
				</div>
			</div>

		</div>
	</div>
</template>


<script>
import axios from 'axios'

export default {
	data () {
	    return {
	    	products: [],
	      }
    },
  	mounted: function() {
   		axios.get("http://localhost:8888/Laravel6-WS/public/product")
        .then((response) => {
        	console.log(response);
        	this.products = response.data.data;
        })
  	},
  	methods: {
		formatPrice(value) {
			let val = (value/1).toFixed(2).replace('.', ',')
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		getImgUrl(img) {
			return require('../assets/products/'+img)
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
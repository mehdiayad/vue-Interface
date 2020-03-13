<template>
 
	<div class="container-fluid pt-1">
		<div class="row">

			<transition name="fade">
				<div class="col-12 col-sm-12 text-center" v-show="displayAlertAdd()">
					<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 text-white" style="background-color:#39CCCC;">
						<div> Votre produit a bien ete ajoute au panier </div>
					</div>
				</div>
			</transition>


			<div class="col-1 col-sm-1">
				<div class="container-fluid p-0">
					<div class="row">
						<div class="col-12 col-sm-12"> <a  href="#" v-on:click="changeImg(product.img1)"><img alt="product_img_show_1" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 border rounded w-100" v-bind:src="getImgUrl(product.img1)"/></a></div>
						<div class="col-12 col-sm-12"> <a  href="#" v-on:click="changeImg(product.img2)"><img alt="product_img_show_1" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 border rounded w-100" v-bind:src="getImgUrl(product.img2)"/></a></div>
						<div class="col-12 col-sm-12"> <a  href="#" v-on:click="changeImg(product.img3)"><img alt="product_img_show_1" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 border rounded w-100" v-bind:src="getImgUrl(product.img3)"/></a></div>
					</div>
				</div>
			</div>

			<div class="col-4 col-sm-4">
				<div class="col-12 col-sm-12"> <img alt="product_img_display" id="product_img_show_display" class="product_img_show_display img-fluid w-100" v-bind:src="getImgUrl(product.img1)"/></div>
			</div>
			
			<div class="col-4 col-sm-4 text-left">
				<h5> {{ product.description_title }}</h5>
				<p class="pb-0 mb-0"> De <span class="text-primary h5">{{ product.brand }}</span></p>
				
				<span v-for="number in 5" v-bind:key="number">
					<i v-if="number<=product.score" class="fas fa-star text-dark"></i>
					<i v-else class="far fa-star text-dark"></i>
				</span>
				
				<div class="pb-1 mb-2 bg-dark"></div>
				
				<p> Prix : <span class="text-danger h5">{{ formatPrice(product.price) }} € </span> </p>
				
				<ul>
					<span v-for="(description,i) in descriptions" v-bind:key="i">
						<li v-if="(description.length)>1"> {{description}} </li>
					</span>
				</ul>

			</div>
					
			
			<div class="col-3 col-sm-3">
				<div class="container-fluid">
					<div class="row text-left">
						<div class="col-9 col-sm-9 border rounded p-3 mx-auto">
										
							<div v-if="stockIsEnough(product.stock)">
								<h4 class="text-primary"> En Stock </h4>
								<h5 class="mt-5"> Quantite :
									<select v-model="productQuantity">
										<option v-for="number in 15" :key="number" :value="number">
											{{ number }}
										</option>
									</select>
								</h5>
							</div>

							<div v-else>
								<h4 class="text-danger"> Plus que {{ product.stock }} restants </h4>
								<h5 class="mt-5"> Quantite : 
									<select v-model="productQuantity">
										<option v-for="number in product.stock" :key="number" :value="number">
											{{ number }}
										</option>
									</select>
								</h5>
							</div>

							<div class="text-center">
								<button class="btn btn-info w-100 mt-3" @click="addToCart()"> Ajouter au panier </button>

								<router-link :to="{ name: 'cart_index', params: { id: userId } }">
									<button class="btn btn-danger w-100 mt-3"> Voir le panier </button>
								</router-link>
							</div>
													
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  
</template>


<script>

import axios from 'axios'
import userStore from '../store/userStore'
import navbarStore from '../store/navbarStore'

export default {

  	data () {
	    return {
		productId: this.$route.params.id,
		userId: userStore.getters.getUserId,
		product: [],
		descriptions: null,
		alert: false,
      }
	},
	computed: {
		productQuantity: { get: function() {return 1 }, set: function(value){}}
	},
  	mounted: function() {
		this.getProduct(this.productId)
	},
  	methods: {
		stockIsEnough: function(value){
			return (value >= 15 ? true : false)
		},
		displayAlertAdd: function(){
			return this.alert
		},
		getProduct: function(id) {
			//console.log('call get product')
			var url = process.env.VUE_APP_API_URL_PRODUCT_SHOW + id   
			
			axios.get(url)
       		.then((response) => {
			//console.log(response),
			this.product = response.data
			this.descriptions = this.product.description_product.split('.')
			this.productQuantity = 0
			//console.log(this.product)
			//console.log(this.descriptions)
			})

		},
		changeImg: function(path){
			document.getElementById("product_img_show_display").src = this.getImgUrl(path);
		},
		displayConsole(){
			console.log(this.product)
			console.log(this.descriptions)
		},
		addToCart: function(){
			
			var url = process.env.VUE_APP_API_URL_CART_STORE    
			//console.log('[ADDTOCART] = ' + url)

			axios({
				method: 'post',
				url : url,
				data : {
						// variable elements
						user_id: userStore.getters.getUserId, 
						product_id : this.productId,
						product_quantity : this.productQuantity,
						product_price: this.product.price
						}
			})
       		.then((response) => {
			//console.log(response)

			if(response.data.isStored){
				//console.log(this.productQuantity)
				//console.log( typeof this.productQuantity)
				navbarStore.commit('updateCartNumber', this.productQuantity)
				this.alert = true
			}
			
			this.productQuantity = 0

			});
		}	
		
	}
}
</script>


<style scoped>

.product_img_show_mini
{	
	height:100px;
}

.product_img_show_display
{
	height:500px;
}

</style>


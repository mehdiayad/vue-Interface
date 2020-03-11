<template>
 
	<div class="container-fluid pt-3">
		<div class="row">
			<div class="col-9 col-sm-9">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12 col-sm-12 text-left">
							<h3> Mon Panier</h3>
							<div class="bg-dark pt-1"></div>
						</div>
						
						<div v-for="cart in carts" :key="cart.id" class="col-12 col-sm-12">
							<div class="container-fluid">
								<div class="row pt-3">
									<div class="col-3 col-sm-3">
										<img alt="product overview" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 w-100" :src="getImgUrl(cart.img_overview)" />
									</div>
									<div class="col-7 col-sm-7 text-left">
										<router-link :to="{ name: 'product_show', params: { id: cart.product_id } }" style="text-decoration:none;">
											<div class="description_title"> {{ cart.description_title }} </div>
										</router-link>
									</div>
									<div class="col-2 col-sm-2">
										<h4 class="text-danger"> {{ formatPrice(cart.price) }} € </h4>
									</div>
									<div v-show="notLastElement(cart)" class="col-12 col-sm-12">
										<div class="bg-dark pt-1"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-3 col-sm-3">
				<div class="px-3 py-3 bg-white text-center border rounded">
					<h4 class="text-left"> Total : <span class="text-danger"> {{ formatPrice(total_cart_price) }} €</span></h4>
					<a class="btn btn-info rounded text-white w-100"> Passer la commande</a>
				</div>
			</div>

		</div>
	</div>
  
</template>


<script>

import axios from 'axios'
import store from '../store/store'
//import {functionsMixin} from '../mixins/functionsMixin'


export default {

	//mixins: [functionsMixin],
  	data () {
	    return {
			carts: [],
			user_id: store.getters.userid,
			total_cart_price: 0,
      }
	},
	mounted:function(){
		this.getCart(this.user_id)
	},
  	methods: {
		getCart(id) {
			//console.log('call get cart')
			var url = process.env.VUE_APP_API_URL_CART_INDEX_CUSTOM + id   
			//console.log(url)

		axios.get(url)
       		.then((response) => {
			//console.log(response),
			this.carts = response.data,
			//console.log(this.carts)
			this.getTotalPriceCart()
			})

		},
		notLastElement(cart){
			var temp = this.carts[this.carts.length-1]

			if(cart == temp) 
				return false
			else 
				return true
		},
		getTotalPriceCart(){
			//console.log('call getTotalPriceCart')
			this.carts.forEach(element => (
				//console.log(element.cart_price),
				this.total_cart_price += element.cart_price
			))
		}
	}
}
</script>


<style scoped>

.product_img_show_mini {	
	height:200px;
}

a {
	color: black;
}

a :hover{
	color: #5bc0de;
}


</style>


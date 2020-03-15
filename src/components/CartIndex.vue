<template>
 
	<div class="container-fluid pt-3">
		<div class="row">
			<div class="col-9 col-sm-9">
				<div class="container-fluid">
					<div class="row">
						
						<transition name="fade">
							<div class="col-12 col-sm-12 text-center" v-show="displayAlertUpdate()">
								<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 text-white" style="background-color:#39CCCC;">
									<div> Votre produit a bien ete modifie </div>
								</div>
							</div>
						</transition>

						<transition name="fade">
							<div class="col-12 col-sm-12 text-center" v-show="displayAlertDelete()">
								<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 bg-danger text-white">
									<div> Votre produit a bien ete supprime </div>
								</div>
							</div>
						</transition>

						<div class="col-12 col-sm-12 text-left">
							<h3> Mon Panier</h3>
							<div class="bg-dark pt-1"></div>
						</div>
						
						<div v-for="(cart,myIndex) in carts" :key="cart.id" :index="myIndex" class="col-12 col-sm-12">
							<div class="container-fluid">
								<div class="row pt-3">
									<div class="col-3 col-sm-3">
										<img alt="product overview" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 w-100" :src="getImgUrl(cart.img_overview)" />
									</div>
									<div class="col-7 col-sm-7 text-left">
										<router-link :to="{ name: 'product_show', params: { id: cart.product_id } }" style="text-decoration:none;">
											<div class="description_title"> {{ cart.description_title }} </div>
										</router-link>
										<div class="mt-2">
											Quantite :
											<select v-model.number="cart.product_quantity">
												<option v-for="number in 15" :key="number">
													{{ number }}
												</option>
											</select>
											<a @click="updateCart(myIndex)" class="btn btn-info text-white ml-3"> Modifier</a>
										</div>
										
										<div class="mt-3">
											<a @click="deleteCart(myIndex)" class="btn btn-danger text-white w-50"> Supprimer</a>
										</div>
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
					<h4 class="text-left"> Total : <span class="text-danger"> {{ formatPrice(totalCartPrice) }} €</span></h4>
					<a class="btn btn-info rounded text-white w-100"> Passer la commande</a>
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
			carts: [],
			userId: userStore.getters.getUserId,
			totalCartPrice: 0,
			alertUpdate:false,
			alertDelete:false
      }
	},
	mounted:function(){
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.getters.getUserTokenAccess
		//console.log(axios.defaults.headers.common['Authorization'])
		this.getCart(this.userId)
	},
  	methods: {
		displayAlertUpdate: function() {
			return this.alertUpdate
		},
		displayAlertDelete: function(){
			return this.alertDelete
		},
		getCart(id) {
			//console.log('call get cart')
      		var url = process.env.VUE_APP_API_BASE_URL + 'cart'
			//console.log(url)

		axios.get(url)
       		.then((response) => {
			//console.log(response),
			this.carts = response.data,
			this.getTotalPriceCart()
			})
			.catch(function (error) {
          		console.log(error)
      		});

		},
		notLastElement(cart){
			var temp = this.carts[this.carts.length-1]

			if(cart == temp) 
				return false
			else 
				return true
		},
		updateCart(indexTemp){

			var cartTemp = this.carts[indexTemp]
			var idCart = cartTemp.cart_id;
      		var url = process.env.VUE_APP_API_BASE_URL + 'cart/' + idCart
			cartTemp.cart_price = cartTemp.price * cartTemp.product_quantity

			axios({
				method: 'put',
				url : url,
				data : {
						// variable elements
						user_id: userStore.getters.getUserId, 
						product_id : cartTemp.product_id,
						product_quantity : cartTemp.product_quantity,
						product_price: cartTemp.price
						}
			})
       		.then((response) => {
			//console.log(response)
			this.getTotalPriceCart()
			this.getCartNumber()
			this.alertUpdate = true
			this.alertDelete = false
			})
			.catch(function (error) {
          		console.log(error)
      		});

		},
		deleteCart(indexTemp){

			// Variables
			var cartTemp = this.carts[indexTemp]
			var idCart = cartTemp.cart_id;
      		var url = process.env.VUE_APP_API_BASE_URL + 'cart/' + idCart

			axios({
				method: 'delete',
				url : url,
			})
       		.then((response) => {
				//console.log(response)
				this.carts.splice(indexTemp, 1)
				this.getTotalPriceCart()
				this.getCartNumber()
				this.alertDelete = true
				this.alertUpdate = false
			})
			.catch(function (error) {
          		console.log(error)
      		});
		},
		getTotalPriceCart(){

			this.totalCartPrice = 0
			for(var i = 0; i<this.carts.length; i++)
			{
				this.totalCartPrice += this.carts[i].cart_price
			}
		},
		getCartNumber(){
			
			var cartNumber=0;
			for(var i = 0; i<this.carts.length; i++)
			{
				cartNumber += this.carts[i].product_quantity
			}
			navbarStore.commit('setCartNumber', cartNumber)
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


<template>
 
	<div class="container-fluid pt-3">
		<div class="row">
			<div class="col-9 col-sm-9">
				<div class="container-fluid">
					<div class="row">
						<div class="col-11 col-sm-11 mx-auto">

							<div class="container-fluid" v-if="addressBillingDefault != null">
								<div class="row text-left">
									<div class="col-5 col-sm-5">
										<h5> 1. Adresse de facturation </h5>
									</div>

									<div class="col-5 col-sm-5">
										<div> {{ addressBillingDefault.full_name}}</div>
										<div> {{ addressBillingDefault.address}}</div>
										<div> {{ addressBillingDefault.postal_code +','+ addressBillingDefault.city }}</div>
										<div> {{ addressBillingDefault.country}}</div>
									</div>

									<div class="col-2 col-sm-2">
										<a class="btn btn-dark border rounded text-white w-100 mt-4"> Modifier</a>
									</div>
								</div>
							</div>

							<div class="bg-dark pt-1 my-2 w-100"></div>

							<div class="container-fluid" v-if="addressShippingDefault != null">
								<div class="row text-left">
									<div class="col-5 col-sm-5">
										<h5> 1. Adresse de livraison </h5>
									</div>

									<div class="col-5 col-sm-5">
										<div> {{ addressShippingDefault.full_name}}</div>
										<div> {{ addressShippingDefault.address}}</div>
										<div> {{ addressShippingDefault.postal_code +','+ addressShippingDefault.city }}</div>
										<div> {{ addressShippingDefault.country}}</div>
									</div>

									<div class="col-2 col-sm-2">
										<a class="btn btn-dark border rounded text-white w-100 mt-4"> Modifier</a>
									</div>
								</div>
							</div>

							<div class="bg-dark pt-1 my-2 w-100"></div>

							<div class="container-fluid" v-if="addressShippingDefault != null">
								<div class="row text-left">
									<div class="col-12 col-sm-12">
										<h5> 3. Verification de la commande </h5>
									</div>

									<div v-for="(cart,myIndex) in carts" :key="cart.id" :index="myIndex" class="col-12 col-sm-12">
										<div class="container-fluid">
											<div class="row pt-3">
												<div class="col-3 col-sm-3">
													<img alt="product overview" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 w-100" :src="getImgUrl(cart.img_overview)" />
												</div>
												<div class="col-9 col-sm-9 text-left">
													<router-link :to="{ name: 'product_show', params: { id: cart.product_id } }" style="text-decoration:none;">
														<div class="description_title"> {{ cart.description_title }} </div>
													</router-link>

													<div class="mt-2">	Quantite : {{ cart.product_quantity }} </div>
													<div class="mt-2"> Prix unitaire : {{ cart.price }} €</div>
													<div class="mt-2 text-danger font-weight-bold"> Prix total : {{ cart.cart_price }} € </div>
													
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

					</div>
				</div>
			</div>

			<div class="col-3 col-sm-3">
				<div class="px-3 py-3 bg-white text-left border rounded">

					<a class="btn btn-danger text-white w-100 mb-2"> Acheter </a>
					<div class="small"> En passant votre commande, vous acceptez les Conditions générales de vente. Veuillez consulter notre Notice : données personnelles, notre Notice Cookies et notre Notice Annonces publicitaires basées sur vos centres d’intérêt. </div>
					<div class="bg-dark pt-1 w-100 my-3"></div>
					<h5 class="text-center"> Recapitulatif de la commande </h5>
					<h5 class="text-danger"> Montant total : <span class="float-right"> {{ totalCartPrice }} € </span></h5>
				</div>
			</div>

		</div>
	</div>
  
</template>


<script>

import axios from '../axios/index'
import userStore from '../store/userStore'
import navbarStore from '../store/navbarStore'

export default {

data () {
	    return {
			userId: userStore.getters.getUserId,
			totalCartPrice: 0,
			addressBilling:[],
			addressBillingDefault: null,
			addressShipping:[],
			addressShippingDefault: null,
			carts: [],
      }
	},
	mounted:function(){
		this.getAddresses()
		this.getCarts()
	},
  	methods: {
		getAddresses() {

			//console.log('call get address')
      		var url = process.env.VUE_APP_API_BASE_URL + 'address'
			//console.log(url)

			axios.get(url)
				.then((response) => {
				//console.log(response),

				this.addressBilling = response.data.billing
				this.addressShipping = response.data.shipping

				for (var i= 0; i< this.addressBilling.length; i++){
					if (this.addressBilling[i].is_default){
						this.addressBillingDefault = this.addressBilling[i]
						//console.log(this.addressBillingDefault)
						break; 
					}
				}

				for (var i= 0; i< this.addressShipping.length; i++){
					if (this.addressShipping[i].is_default){
						this.addressShippingDefault = this.addressShipping[i]
						//console.log(this.addressShippingDefault)
						break; 
					}
				}
			})
			.catch(function (error) {
				console.log(error)
			});

		},
		getCarts() {

			console.log('call get carts')
      		var url = process.env.VUE_APP_API_BASE_URL + 'cart'
			//console.log(url)

			axios.get(url)
				.then((response) => {
				console.log(response)
				this.carts = response.data
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
		getTotalPriceCart(){

			console.log("IN")
			this.totalCartPrice = 0
			console.log("SIZE = " + this.carts.length)
			for(var i = 0; i<this.carts.length; i++)
			{
				this.totalCartPrice += this.carts[i].cart_price
			}
			console.log("PRICE = " + this.totalCartPrice)
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


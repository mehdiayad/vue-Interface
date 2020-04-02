<template>
 
	<div class="container-fluid pt-3">
		<div class="row">
			<div class="col-9 col-sm-9">
				<div class="container-fluid">
					<div class="row">
						<div class="col-11 col-sm-11 mx-auto">

							<div class="container-fluid" v-if="adresses.billingDefault != null">
								<div class="row text-left">
									<div class="col-5 col-sm-5">
										<h5> 1. Adresse de facturation </h5>
									</div>

									<div class="col-4 col-sm-4">
										<div> {{ adresses.billingDefault.full_name}}</div>
										<div> {{ adresses.billingDefault.address}}</div>
										<div> {{ adresses.billingDefault.postal_code +','+ adresses.billingDefault.city }}</div>
										<div> {{ adresses.billingDefault.country}}</div>
									</div>

									<div class="col-3 col-sm-3">
										<a class="btn btn-dark border rounded text-white w-100 mt-4"> Modifier</a>
									</div>
								</div>
							</div>

							<div class="bg-dark pt-1 my-2 w-100"></div>

							<div class="container-fluid" v-if="adresses.shippingDefault != null">
								<div class="row text-left">
									<div class="col-5 col-sm-5">
										<h5> 2. Adresse de livraison </h5>
									</div>

									<div class="col-4 col-sm-4">
										<div> {{ adresses.shippingDefault.full_name}}</div>
										<div> {{ adresses.shippingDefault.address}}</div>
										<div> {{ adresses.shippingDefault.postal_code +','+ adresses.shippingDefault.city }}</div>
										<div> {{ adresses.shippingDefault.country}}</div>
									</div>

									<div class="col-3 col-sm-3">
										<a class="btn btn-dark border rounded text-white w-100 mt-4"> Modifier</a>
									</div>
								</div>
							</div>


							<div class="bg-dark pt-1 my-2 w-100"></div>

							<div class="container-fluid">
								<div class="row text-left">
									<div class="col-12 col-sm-12">
										<h5> 3. Verification de la commande </h5>
									</div>

									<div v-for="(cart,myIndex) in carts.data" :key="cart.id" :index="myIndex" class="col-12 col-sm-12">
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
													<div class="mt-2"> Prix unitaire : {{ formatPrice(cart.price) }} €</div>
													<div class="mt-2 text-danger font-weight-bold"> Prix total : {{ formatPrice(cart.cart_price) }} € </div>
													
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
					<h5 class="text-danger"> Montant total : <span class="float-right"> {{ formatPrice(carts.totalCartPrice) }} € </span></h5>
				</div>
			</div>

		</div>
	</div>
  
</template>


<script>

export default {

	data () {
	    return {
			adresses:{
				billing:[],
				billingDefault: null,
				shipping:[],
				shippingDefault: null,
			},
			carts: {
				data : [],
				totalCartPrice: 0,
			}
      }
	},
	mounted(){
		this.getAddresses()
		this.getCarts()
	},
  	methods: {
		getAddresses() {
      		let url = process.env.VUE_APP_API_BASE_URL + 'address'
			axios.get(url)
				.then((response) => {
				//console.log(response),
				this.adresses.billing = response.data.billing
				this.adresses.shipping = response.data.shipping

				for (let i= 0; i< this.adresses.billing.length; i++){
					if (this.adresses.billing[i].is_default){
						this.adresses.billingDefault = this.adresses.billing[i]
						break; 
					}
				}

				for (let i= 0; i< this.adresses.shipping.length; i++){
					if (this.adresses.shipping[i].is_default){
						this.adresses.shippingDefault = this.adresses.shipping[i]
						break; 
					}
				}
			})
			.catch((error) => {
				console.log(error)
			});

		},
		getCarts() {
      		let url = process.env.VUE_APP_API_BASE_URL + 'cart'
			axios.get(url)
				.then((response) => {
				//console.log(response)
				this.carts.data = response.data
				this.getTotalPriceCart()

			})
			.catch((error) => {
				console.log(error)
			});
		},
		getTotalPriceCart(){
			this.carts.totalCartPrice = 0
			for(let i = 0; i<this.carts.data.length; i++)
			{
				this.carts.totalCartPrice += this.carts.data[i].cart_price
			}
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


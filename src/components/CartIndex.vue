<template>
 
	<div class="container-fluid pt-3">
		<div class="row">
			<div class="col-9 col-sm-9">
				<div class="container-fluid">
					<div class="row">
						
						<transition name="fade">
							<div class="col-12 col-sm-12 text-center" v-show="displayAlertUpdate">
								<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 alert-success success">
									<div> Votre produit a bien ete modifie </div>
								</div>
							</div>
						</transition>

						<transition name="fade">
							<div class="col-12 col-sm-12 text-center" v-show="displayAlertDelete">
								<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 alert-danger danger">
									<div> Votre produit a bien ete supprime </div>
								</div>
							</div>
						</transition>

						<div class="col-12 col-sm-12 text-left">
							<h3> Mon Panier</h3>
							<div class="bg-dark pt-1"></div>
						</div>
						
						<div class="container-fluid">
							<div v-if="carts.data.length>0">
								<div v-for="(cart,myIndex) in carts.data" :key="cart.id" :index="myIndex" class="col-12 col-sm-12">
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
										<div v-show="ifNotLastElement(cart)" class="col-12 col-sm-12">
											<div class="bg-dark pt-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div v-else class="text-left mt-2"> 
								<h4> Votre panier est vide </h4>
								<h6> Visitez notre liste de produits a travers la barre de recherche</h6>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-3 col-sm-3">
				<div class="px-3 py-3 bg-white text-center border rounded">
					<h4 class="text-left"> Total : <span class="text-danger"> {{ formatPrice(carts.totalCartPrice) }} €</span></h4>
					<router-link :to="{ name: 'cart_confirm', params: { id: user.userId } }" style="text-decoration:none;">
						<button class="btn btn-info rounded text-white w-100" @click="displayCartAlert($event)"> Passer la commande</button>
					</router-link>
				</div>
			</div>

		</div>
	</div>
  
</template>


<script>

export default {

data () {
	    return {
			carts: {
				data: [],
				totalCartPrice: 0,
			},
			alertCart:{
				update: false,
				delete: false
			}
      }
	},
	mounted(){
		this.getCart(this.user.userId)
	},
	computed:{
		displayAlertUpdate() {
			return this.alertCart.update
		},
		displayAlertDelete(){
			return this.alertCart.delete
		}
	},
  	methods: {
		setAlertUpdate(value){
			this.alertCart.update = value
			setTimeout(() => {
				this.alertCart.update = !value
			}, 1000);
		},
		setAlertDelete(value){
			this.alertCart.delete = value
			setTimeout(() => {
				this.alertCart.delete = !value
			}, 1000);
		},
		displayCartAlert(event){
			if(this.carts.data == 0){
				window.alert('Votre panier est vide, vous ne pouvez pas passer de commande')
				event.preventDefault()
			}
		},
		getCart(id) {
      		let url = process.env.VUE_APP_API_BASE_URL + 'cart'
			axios.get(url)
				.then((response) => {
				//console.log(response),
				this.carts.data = response.data,
				this.getTotalPriceCart()
			})
			.catch( (error) => {
				console.log(error)
			});

		},
		ifNotLastElement(cart){
			return (cart != this.carts.data[this.carts.data.length-1])
		},
		updateCart(indexTemp){

			let cartTemp = this.carts.data[indexTemp]
			let idCart = cartTemp.cart_id;
      		let url = process.env.VUE_APP_API_BASE_URL + 'cart/' + idCart
			cartTemp.cart_price = cartTemp.price * cartTemp.product_quantity

			axios({
				method: 'put',
				url : url,
				data : {
					// variable elements
					user_id: this.user.userId, 
					product_id : cartTemp.product_id,
					product_quantity : cartTemp.product_quantity,
					product_price: cartTemp.price
				}
			})
       		.then((response) => {
				//console.log(response)
				this.getTotalPriceCart()
				this.getCartNumber()
				this.setAlertUpdate(true)
			})
			.catch( (error) => {
          		console.log(error)
      		});

		},
		deleteCart(indexTemp){

			// Variables
			let cartTemp = this.carts.data[indexTemp]
			let idCart = cartTemp.cart_id;
      		let url = process.env.VUE_APP_API_BASE_URL + 'cart/' + idCart

			axios({
				method: 'delete',
				url : url,
			})
       		.then((response) => {
				//console.log(response)
				this.carts.data.splice(indexTemp, 1)
				this.getTotalPriceCart()
				this.getCartNumber()
				this.setAlertDelete(true)
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
		},
		getCartNumber(){
			let cartNumber=0;
			for(let i = 0; i<this.carts.data.length; i++)
			{
				cartNumber += this.carts.data[i].product_quantity
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


<template>
 
	<div class="container-fluid pt-1">
		<div class="row pt-3">

			<transition name="fade">
				<div class="col-12 col-sm-12 text-center" v-show="displayAlertAddSuccess">
					<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 alert alert-success">
						<div> Votre produit a bien ete ajoute au panier </div>
					</div>
				</div>
			</transition>

			<transition name="fade">
				<div class="col-12 col-sm-12 text-center" v-show="displayAlertAddFaillure">
					<div class="col-6 col-sm-6 mx-auto border rounded py-2 my-2 alert alert-danger">
						<div> Vous ne pouvez pas ajouter plus de 15 quantite pour un article</div>
					</div>
				</div>
			</transition>


			<div class="col-1 col-sm-1">
				<div class="container-fluid p-0">
					<div class="row">
						<div class="col-12 col-sm-12"> <a  href="#" v-on:click="changeImg(product.data.img1)"><img alt="product_img_show_1" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 border rounded w-100" v-bind:src="getImgUrl(product.data.img1)"/></a></div>
						<div class="col-12 col-sm-12"> <a  href="#" v-on:click="changeImg(product.data.img2)"><img alt="product_img_show_1" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 border rounded w-100" v-bind:src="getImgUrl(product.data.img2)"/></a></div>
						<div class="col-12 col-sm-12"> <a  href="#" v-on:click="changeImg(product.data.img3)"><img alt="product_img_show_1" class="product_img_show_mini product_img_show_1 img-fluid  mt-3 border rounded w-100" v-bind:src="getImgUrl(product.data.img3)"/></a></div>
					</div>
				</div>
			</div>

			<div class="col-4 col-sm-4">
				<div class="col-12 col-sm-12"> <img alt="product_img_display" id="product_img_show_display" class="product_img_show_display img-fluid w-100" v-bind:src="getImgUrl(product.data.img1)"/></div>
			</div>
			
			<div class="col-4 col-sm-4 text-left">
				<h5> {{ product.data.description_title }}</h5>
				<p class="pb-0 mb-0"> De <span class="text-primary h5">{{ product.data.brand }}</span></p>
				
				<span v-for="number in 5" v-bind:key="number">
					<i v-if="number<=product.data.score" class="fas fa-star text-dark"></i>
					<i v-else class="far fa-star text-dark"></i>
				</span>
				
				<div class="pb-1 mb-2 bg-dark"></div>
				
				<p> Prix : <span class="text-danger h5">{{ formatPrice(product.data.price) }} € </span> </p>
				
				<ul>
					<span v-for="(description,i) in product.descriptions" v-bind:key="i">
						<li v-if="(description.length)>1"> {{description}} </li>
					</span>
				</ul>

			</div>
					
			<div class="col-3 col-sm-3">
				<div class="container-fluid">
					<div class="row text-left">
						<div class="col-9 col-sm-9 border rounded p-3 mx-auto">
							<div v-if="stockIsEnough(product.data.stock)" >
								<h4 class="text-primary"> En Stock </h4>
								<h5 class="mt-5"> Quantite :
									<select v-model.number="product.quantitySelected" >
										<option v-for="number in 15"  :key="number" :value="number">
											{{  number }}
										</option>
									</select>
								</h5>
							</div>

							<div v-else>
								<h4 class="text-danger"> Plus que {{ product.data.stock }} restants </h4>
								<h5 class="mt-5"> Quantite : 
									<select v-model.number="product.quantitySelected" >
										<option v-for="number in product.data.stock"  :key="number" :value="number">
											{{ number  }}
										</option>
									</select>
								</h5>
							</div>

							<div class="text-center">
								<button class="btn btn-info w-100 mt-3" @click="getCartProduct()"> Ajouter au panier </button>

								<router-link :to="{ name: 'cart_index', params: { id: user.userId } }">
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

export default {

  	data () {
	    return {
			product:{
				data: [],
				descriptions: [],
				quantitySelected: 1,
				quantityStored: 0
			},
			addAlert:{
				success: false,
				faillure: false,
			}
      }
	},
  	mounted() {
		this.getProduct(this.$route.params.id)
	},
	computed:{
		displayAlertAddSuccess(){
			return this.addAlert.success
		},
		displayAlertAddFaillure(){
			return this.addAlert.faillure
		}
	},
  	methods: {
		stockIsEnough(value){
			return (value >= 15 ? true : false)
		},
		setAlertAddSuccess(value){
			var self = this;
			self.addAlert.success = value
			setTimeout(function(){
				self.addAlert.success = !value
			}, 3000);
		},
		setAlertAddFaillure(value){
			var self = this;
			self.addAlert.faillure = value
			setTimeout(function(){
				self.addAlert.faillure = !value
			}, 3000);
		},
		getProduct(id) {
      		var url = process.env.VUE_APP_API_BASE_URL + 'product/' + id
			axios.get(url)
       		.then((response) => {
				//console.log(response),
				this.product.data = response.data
				this.product.descriptions = this.product.data.description_product.split('.')
			})
			.catch(function (error) {
          		console.log(error)
      		});
		},
		changeImg(path){
			document.getElementById("product_img_show_display").src = this.getImgUrl(path);
		},
		getCartProduct(){
			  var url = process.env.VUE_APP_API_BASE_URL + 'cart/product'
			axios({
				method: 'post',
				url : url,
				data : {
					user_id: this.user.userId, 
					product_id : this.product.data.id,
				}
			})
       		.then((response) => {
				//console.log(response)
				var data = response.data
				if(data.length > 0){
					this.product.quantityStored = response.data[0].product_quantity
				} 
				this.addProductCart()
			})
			.catch(function (error) {
          		console.log(error)
			});
			  
		},
		addProductCart(){

			if(this.product.quantityStored + this.product.quantitySelected >15){
				this.setAlertAddFaillure(true)
			}else{

				var url = process.env.VUE_APP_API_BASE_URL + 'cart'
				axios({
					method: 'post',
					url : url,
					data : {
							// variable elements
							user_id: this.user.userId, 
							product_id : this.product.data.id,
							product_price: this.product.data.price,
							product_quantity : this.product.quantitySelected,
					}
				})
				.then((response) => {
					if(response.data.isStored){
						navbarStore.commit('updateCartNumber', this.product.quantitySelected)
						this.setAlertAddSuccess(true)
						this.product.quantitySelected = 1
					}
				})
				.catch(function (error) {
					console.log(error)
			  	});
			}			
		},
		addToCart(){
			this.getCartProduct()
			this.addProductCart()
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


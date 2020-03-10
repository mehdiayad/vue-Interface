export const functionsMixin = {

	methods: {
		formatPrice: function(value){
  			let val = (value/1).toFixed(2).replace('.', ',')
 			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		getImgUrl: function(img_path) {
			return '/images/products/'+ img_path
		},
	}

}
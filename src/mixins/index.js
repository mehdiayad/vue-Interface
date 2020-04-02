var myMixin = {

	data() {
		return{
			user: userStore.getters.getUserAll,
		}
	},
	methods: {
		formatPrice(value){
  			let val = (value/1).toFixed(2).replace('.', ',')
 			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		getImgUrl(img_path) {
			return '/images/products/'+ img_path
		},
		isNotNull(obj){
			return (obj !== null)
		},
		cutString(value,size){
			return value.substring(0,size);
		},
		msToTime(duration) {

			let hours = Math.trunc(duration / 3600)
			let minutes = Math.trunc((duration % 3600) / 60)
			let seconds = Math.trunc(((duration % 3600) % 60))
	
			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;
		  
			return hours + ":" + minutes + ":" + seconds;
		  }
	}
}

export default myMixin;
<template>
 	<div class="container-fluid">
		 <div class="row">
			 <div class="col-3 col-sm-3 mx-auto">
				<transition name="fade">
					<div class="card mt-3" v-if="visible">
						<div class="card-header bg-info text-white"> Counter </div>
						<div class="card-body">
							<div> {{ message }} </div>
						</div>
					</div>
				</transition>
				<a class="btn btn-info text-white mt-3" @click="toggle()"> afficher</a>

			</div>
		</div>
	</div>

</template>

<script> 

export default {
  	data () {
	    return {
			visible: true,
			message: 'Ceci est une alerte'
	      }
	},
	methods:{
		toggle: function(){
			this.visible = !this.visible
		}
	}
}
</script>

<style scoped>

.fade-enter-active,.fade-leave-active{
	transition: opacity 1s, transform 1s;
}

.face-enter, .fade-leave-to{
	opacity:0;
	transform: translateX(20px);
}

</style>
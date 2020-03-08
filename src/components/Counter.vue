<template>
 	<div class="container-fluid">
		 <div class="row">
			 <div v-for="number in 8" :key="number" class="col-3 col-sm-3 mx-auto">
				<div class="card mt-3">
					<div class="card-header bg-info text-white"> Counter </div>
					<div class="card-body">
						<span @click="decrement()"> [-] </span>
						<span class="counter px-4"> {{ count }} </span>
						<span @click="increment()"> [+] </span>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script> 

import counterStore from '../store/CounterStore'

export default {
  	data () {
	    return {
			state: counterStore.state
	      }
	},
	computed:{
		count: function() {return this.state.count}
	},
	methods:{
		increment: function(){
			console.log('+')
			counterStore.increment()
		},
		decrement: function(){
			console.log('-')
			counterStore.decrement()
		}
	}
}
</script>

<style scoped>
</style>
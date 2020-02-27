<template>
	<div class="counter border p-2 m-2 w-25 mx-auto">
		{{ count }}
		<div class="counter_button text-light border bg-dark" @click="increment"> + </div>
		
	</div>
</template>

<script>
	import CounterNotifications from '../repository/CounterNotifications'

	export default {
		name: 'Counter',
		data() {
			return {
				state: CounterNotifications.state
			}
		},
		computed: {
			count : function() {
				return this.state.count
			}
		},
		methods: {
			increment() {
				CounterNotifications.increment()
			}
		}
	}
</script>

<style src="../css/style.css"> </style>

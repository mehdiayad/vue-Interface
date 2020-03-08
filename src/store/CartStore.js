import Vuex from 'vuex'

const state = {

	cart: [{
		name: 'cart example',
		completed: true
	}]
}

const mutations = {

	ADD_CART: (state,name) => {
		state.cart.push({
			name: name,
			completed: false
		})
	}
}

let cartStore = new Vuex.Store({

	state: state,
	mutations: mutations,
	getters: {},
	actions: {},

})

global.cartStore = cartStore

export default cartStore

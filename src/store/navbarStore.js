import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'navbar',
  storage: window.localStorage
})

const state = {
	productSearch: null,
	categorySearch: 0,
	cartNumber: 0,
	categories: [],
}

const mutations = {
	setProductSearch(state, value) {
		
		if (value == "") {
			value = null
		}
		state.productSearch = value
	},
	setCategorySearch(state, value) {
		state.categorySearch = value 
	},
	setCartNumber(state, value) {
		state.cartNumber = value 
	},
	updateCartNumber(state, value) {
		state.cartNumber += value 
	},
	setCategories(state,value){

		state.categories = value
	}
}

const getters = {
	getProductSearch: state => { return state.productSearch },
	getCategorySearch: state => { return state.categorySearch },
	getCartNumber: state => { return state.cartNumber },
	getCategories: state => {return state.categories}
}

var navbarStore = new Vuex.Store({

	state: state,

	mutations: mutations,

	getters: getters,

	actions: {},

	plugins: [vuexPersist.plugin],

	strict: true
})

export default navbarStore


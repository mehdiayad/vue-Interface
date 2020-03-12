import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'navbar',
  storage: window.localStorage
})

const state = {
	productsearch: null,
	categorysearch: 0,
	cartnumber: 0,
}

const mutations = {
	setproduct(state, productsearch) {
		
		if (productsearch == "") {
			productsearch = null
		}
		state.productsearch = productsearch
	},
	setcategory(state, categorysearch) {
		state.categorysearch = categorysearch 
	},
	setcartnumber(state, cartnumber) {
		state.cartnumber = cartnumber 
	},
	updatecartnumber(state, cartnumber) {
		state.cartnumber += cartnumber 
	}
}

const getters = {
	productsearch: state => { return state.productsearch },
	categorysearch: state => { return state.categorysearch },
	cartnumber: state => { return state.cartnumber },
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


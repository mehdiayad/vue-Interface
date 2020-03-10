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
	categorysearch: null,
}

const mutations = {
	setproduct(state, productsearch) {
		state.productsearch = productsearch 
	},
	setcategory(state, categorysearch) {

		if (categorysearch == 0){
			categorysearch = null
		}
		state.categorysearch = categorysearch 
	},
}

const getters = {
	productsearch: state => { return state.productsearch },
	categorysearch: state => { return state.categorysearch },
	all : state => { return state}
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


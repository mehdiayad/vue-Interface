import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'session',
  storage: window.localStorage,
})

const state = {
	sessionTimeCounter: null,
	sessionTimeRemaining: null,
	sessionTimeLimit: null,
}

const mutations = {

	addSessionTimeCounter(state, value) { state.sessionTimeCounter += value },
	addSessionTimeRemaining(state, value) { state.sessionTimeRemaining += value },
	addSessionTimeLimit(state, value) { state.sessionTimeLimit += value },
	setSessionTimeLimit(state, value) { state.sessionTimeLimit = value },
	setSessionTimeCounter(state, value) { state.sessionTimeCounter = value },
	setSessionTimeRemaining(state, value) { state.sessionTimeRemaining = value },
	login(state){
		state.sessionTimeCounter = 0
		state.sessionTimeRemaining = 600
		state.sessionTimeLimit = 600
	},
	logout(state){
		state.sessionTimeCounter = 0
		state.sessionTimeRemaining = 0
		state.sessionTimeLimit = 600
	}

}

const getters = {
	getSessionTimeCounter : state => { return state.sessionTimeCounter },
	getSessionTimeRemaining : state => { return state.sessionTimeRemaining },
	getSessionTimeLimit : state => { return state.sessionTimeLimit },
}

var sessionStore = new Vuex.Store({

	state: state,

	mutations: mutations,

	getters: getters,

	actions: {},

	plugins: [vuexPersist.plugin],

	strict: true
})

export default sessionStore


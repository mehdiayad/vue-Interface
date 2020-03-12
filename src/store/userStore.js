import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'user',
  storage: window.localStorage
})

const state = {
	userId: null,
	userName: null,
	userEmail: null,
	userConnected: false,
	userInformations: null
}

const mutations = {
	setUserId(state, value) { state.userId = value },
	setUserName(state, value) { state.userName = value },
	setUserEmail(state, value) { state.userEmail = value },
	setUserConnected(state, value) { state.userConnected = value },
	setUserInformations(state, value) { state.userInformations = value }
}

const getters = {
	getUserId: state => { return state.userId },
	getUserName: state => { return state.userName },
	getUserEmail: state => { return state.userEmail },
	getUserConnected: state => { return state.userConnected },
	getUserInformations: state => { return state.userInformations }
}

var userStore = new Vuex.Store({

	state: state,

	mutations: mutations,

	getters: getters,

	actions: {},

	plugins: [vuexPersist.plugin],

	strict: true
})


export default userStore


import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'
import cronJob from '../cron/index'
import router from '../router/index'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'user',
  storage: window.localStorage,
})

const state = {
	userId: null,
	userName: null,
	userEmail: null,
	userConnected: null,
	userInformations: null,
	userTokenAccess: null,
	userTokenRefresh: null,
	userTokenType: null,
	userTokenExpiresIn: null,
	userTokenExpiresAt: null,
	userTokenCreatedAt: null,
}

const mutations = {
	setUserId(state, value) { state.userId = value },
	setUserName(state, value) { state.userName = value },
	setUserEmail(state, value) { state.userEmail = value },
	setUserConnected(state, value) { state.userConnected = value },
	setUserInformations(state, value) { state.userInformations = value },
	setUserTokenAccess(state, value) { state.userTokenAccess = value },
	setUserTokenRefresh(state, value) { state.userTokenRefresh = value },
	setUserTokenType(state, value) { state.userTokenType = value },
	setUserTokenExpiresIn(state, value) { state.userTokenExpiresIn = value },
	setUserTokenExpiresAt(state, value) { state.userTokenExpiresAt = value },
	setUserTokenCreatedAt(state, value) { state.userTokenCreatedAt = value },
	login(state){
		state.userConnected = true
		cronJob.start()
		localStorage.setItem('event-login', new Date().toLocaleString());
		if(router.currentRoute.name !== 'home'){
			router.push({ name: 'home'})
		}
	},
	logout(state){
		state.userConnected = false
		state.userInformations = "Disconnected"
		cronJob.stop()
      	localStorage.setItem('event-logout', new Date().toLocaleString());
	  	if(router.currentRoute.name !== 'login'){
			router.push({ name: 'login'})
		}
	}

}

const getters = {
	getUserId: state => { return state.userId },
	getUserName: state => { return state.userName },
	getUserEmail: state => { return state.userEmail },
	getUserConnected: state => { return state.userConnected },
	getUserInformations: state => { return state.userInformations },
	getUserTokenAccess : state => { return state.userTokenAccess },
	getUserTokenRefresh : state => { return state.userTokenRefresh },
	getUserTokenType : state => { return state.userTokenType },
	getUserTokenExpiresIn : state => { return state.userTokenExpiresIn },
	getUserTokenExpiresAt : state => { return state.userTokenExpiresAt },
	getUserTokenCreatedAt : state => { return state.userTokenCreatedAt },
	getUserAll : state => {return state}
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


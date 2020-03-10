import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'user',
  storage: window.localStorage
})

const state = {
	userid: null,
	username: null,
	useremail: null,
	userconnected: false,
	userinfosconnexion: null
}

const mutations = {
	setuserid(state, id) { state.userid = id },
	setusername(state, username) { state.username = username },
	setuseremail(state, email) { state.useremail = email },
	setuserconnected(state, connected) { state.userconnected = connected },
	setuserinfosconnexion(state, userinfosconnexion) { state.userinfosconnexion = userinfosconnexion }
}

const getters = {
	userid: state => { return state.userid },
	username: state => { return state.username },
	useremail: state => { return state.useremail },
	userconnected: state => { return state.userconnected },
	userinfosconnexion: state => { return state.userinfosconnexion },
	all : state => { return state}
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


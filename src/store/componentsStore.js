import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'components',
  storage: window.localStorage,
})

const state = {
	keyProductIndex: 0,
	keyProductShow: 0,
	keyCartIndex: 0,
	keyCartConfirm: 0,
	keyLogin: 0,
	keyNavbar: 0,
	keyFootbar: 0,
	keyHome: 0,
}

const mutations = {
	setKeyProductIndex(state, value) { state.keyProductIndex += value },
	setkeyProductShow(state, value) { state.keyProductShow += value },
	setkeyCartIndex(state, value) { state.keyCartIndex += value },
	setkeyCartConfirm(state, value) { state.keyCartConfirm += value },
	setkeyLogin(state, value) { state.keyLogin += value },
	setkeyNavbar(state, value) { state.keyNavbar += value },
	setkeyFootbar(state, value) { state.keyFootbar += value },
	setkeyHome(state, value) { state.keyHome += value },
}

const getters = {
	getKeyProductIndex: state => { return state.keyProductIndex },
	getkeyProductShow: state => { return state.keyProductShow },
	getkeyCartIndex: state => { return state.keyCartIndex },
	getkeyCartConfirm: state => { return state.keyCartConfirm },
	getkeyLogin: state => { return state.keyLogin },
	getkeyNavbar: state => { return state.keyNavbar },
	getkeyFootbar: state => { return state.keyFootbar },
	getkeyHome: state => { return state.keyHome },
}

var componentsStore = new Vuex.Store({

	state: state,

	mutations: mutations,

	getters: getters,

	actions: {},

	plugins: [vuexPersist.plugin],

	strict: true
})

export default componentsStore

